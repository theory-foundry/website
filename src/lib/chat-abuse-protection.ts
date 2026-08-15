const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ACTION = "chat_prompt";
const TURNSTILE_ALWAYS_PASS_TEST_SECRET = "1x0000000000000000000000000000000AA";
const TURNSTILE_TOKEN_MAX_LENGTH = 2048;
const DEFAULT_DAILY_LIMIT = 10;
const MAX_DAILY_LIMIT = 1000;

export type TurnstileVerificationResult = { ok: true } | { ok: false; reason: "invalid" | "unavailable" };

export type DailyQuotaResult =
  | { allowed: true; limit: number; remaining: number; resetAt: string }
  | { allowed: false; limit: number; remaining: 0; resetAt: string };

type TurnstileSiteverifyResponse = {
  action?: unknown;
  hostname?: unknown;
  metadata?: { result_with_testing_key?: unknown };
  success?: unknown;
};

export function getUtcDay(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function getNextUtcReset(now = new Date()): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)).toISOString();
}

export function getDailyLimit(rawLimit = process.env.CHAT_DAILY_LIMIT): number {
  if (rawLimit === undefined || rawLimit.trim() === "") {
    return DEFAULT_DAILY_LIMIT;
  }

  const parsedLimit = Number(rawLimit);

  if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > MAX_DAILY_LIMIT) {
    throw new Error("CHAT_DAILY_LIMIT must be an integer between 1 and 1000.");
  }

  return parsedLimit;
}

export function getClientIp(request: Request): string | null {
  const cloudflareIp = request.headers.get("cf-connecting-ip")?.trim();

  if (cloudflareIp) {
    return cloudflareIp;
  }

  return process.env.NODE_ENV === "production" ? null : "127.0.0.1";
}

export async function readBoundedRequestBody(
  body: ReadableStream<Uint8Array> | null,
  maxBytes: number,
): Promise<string | null> {
  if (!body) {
    return "";
  }

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel("request body limit exceeded");
        return null;
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const boundedBody = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    boundedBody.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(boundedBody);
}

export async function hashClientIp(clientIp: string, utcDay: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { hash: "SHA-256", name: "HMAC" }, false, [
    "sign",
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(`${utcDay}:${clientIp}`));

  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function parseHostnameAllowlist(rawHostnames: string | undefined): Set<string> {
  return new Set(
    (rawHostnames ?? "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function verifyTurnstileToken({
  clientIp,
  fetchImpl = fetch,
  hostnames = process.env.TURNSTILE_HOSTNAMES,
  secret = process.env.TURNSTILE_SECRET,
  token,
}: {
  clientIp: string;
  fetchImpl?: typeof fetch;
  hostnames?: string;
  secret?: string;
  token: unknown;
}): Promise<TurnstileVerificationResult> {
  const expectedHostnames = parseHostnameAllowlist(hostnames);

  if (!secret || expectedHostnames.size === 0) {
    return { ok: false, reason: "unavailable" };
  }

  if (typeof token !== "string" || token.length === 0 || token.length > TURNSTILE_TOKEN_MAX_LENGTH) {
    return { ok: false, reason: "invalid" };
  }

  let response: Response;
  let result: TurnstileSiteverifyResponse;

  try {
    response = await fetchImpl(TURNSTILE_SITEVERIFY_URL, {
      body: new URLSearchParams({
        remoteip: clientIp,
        response: token,
        secret,
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { ok: false, reason: "unavailable" };
    }

    result = (await response.json()) as TurnstileSiteverifyResponse;
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  const isLocalTestResponse =
    process.env.NODE_ENV !== "production" &&
    secret === TURNSTILE_ALWAYS_PASS_TEST_SECRET &&
    result.success === true &&
    result.metadata?.result_with_testing_key === true;

  if (isLocalTestResponse) {
    return { ok: true };
  }

  if (
    result.success !== true ||
    result.action !== TURNSTILE_ACTION ||
    typeof result.hostname !== "string" ||
    !expectedHostnames.has(result.hostname.toLowerCase())
  ) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true };
}

export async function consumeDailyQuota({
  clientIp,
  database,
  hashSecret,
  limit = getDailyLimit(),
  now = new Date(),
}: {
  clientIp: string;
  database: D1Database;
  hashSecret: string;
  limit?: number;
  now?: Date;
}): Promise<DailyQuotaResult> {
  const utcDay = getUtcDay(now);
  const ipHash = await hashClientIp(clientIp, utcDay, hashSecret);
  const resetAt = getNextUtcReset(now);
  const updatedAt = now.toISOString();
  const row = await database
    .prepare(
      `INSERT INTO chat_daily_usage (day, ip_hash, request_count, updated_at)
       VALUES (?1, ?2, 1, ?3)
       ON CONFLICT(day, ip_hash) DO UPDATE SET
         request_count = chat_daily_usage.request_count + 1,
         updated_at = excluded.updated_at
       WHERE chat_daily_usage.request_count < ?4
       RETURNING request_count`,
    )
    .bind(utcDay, ipHash, updatedAt, limit)
    .first<{ request_count: number }>();

  if (!row) {
    return { allowed: false, limit, remaining: 0, resetAt };
  }

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - row.request_count),
    resetAt,
  };
}

export async function deleteExpiredQuotaRecords(database: D1Database, now = new Date()): Promise<void> {
  const retentionCutoff = new Date(now);
  retentionCutoff.setUTCDate(retentionCutoff.getUTCDate() - 7);

  await database.prepare("DELETE FROM chat_daily_usage WHERE day < ?1").bind(getUtcDay(retentionCutoff)).run();
}
