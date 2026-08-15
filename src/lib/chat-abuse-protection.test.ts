import assert from "node:assert/strict";
import test from "node:test";

import {
  consumeDailyQuota,
  getDailyLimit,
  getNextUtcReset,
  getUtcDay,
  hashClientIp,
  readBoundedRequestBody,
  verifyTurnstileToken,
} from "./chat-abuse-protection.ts";

function createQuotaDatabase() {
  const counts = new Map<string, number>();

  return {
    counts,
    database: {
      prepare: () => ({
        bind: (day: string, ipHash: string, _updatedAt: string, limit: number) => ({
          first: async () => {
            const key = `${day}:${ipHash}`;
            const currentCount = counts.get(key) ?? 0;

            if (currentCount >= limit) {
              return null;
            }

            const requestCount = currentCount + 1;
            counts.set(key, requestCount);
            return { request_count: requestCount };
          },
        }),
      }),
    } as unknown as D1Database,
  };
}

test("UTC quota windows reset at midnight", () => {
  const now = new Date("2026-08-15T23:59:30.000Z");

  assert.equal(getUtcDay(now), "2026-08-15");
  assert.equal(getNextUtcReset(now), "2026-08-16T00:00:00.000Z");
});

test("daily limit defaults to 10 and rejects unsafe configuration", () => {
  assert.equal(getDailyLimit(undefined), 10);
  assert.equal(getDailyLimit("25"), 25);
  assert.throws(() => getDailyLimit("0"));
  assert.throws(() => getDailyLimit("1.5"));
  assert.throws(() => getDailyLimit("1001"));
});

test("request bodies stop buffering as soon as the byte limit is exceeded", async () => {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array([1, 2, 3]));
      controller.enqueue(new Uint8Array([4, 5, 6]));
      controller.close();
    },
  });

  assert.equal(await readBoundedRequestBody(body, 5), null);
});

test("bounded request bodies preserve valid UTF-8 content", async () => {
  const body = new Blob([JSON.stringify({ message: "hello" })]).stream();

  assert.equal(await readBoundedRequestBody(body, 100), '{"message":"hello"}');
});

test("IP identifiers are deterministic within a day and unlinkable across days", async () => {
  const first = await hashClientIp("203.0.113.9", "2026-08-15", "test-secret");
  const repeated = await hashClientIp("203.0.113.9", "2026-08-15", "test-secret");
  const nextDay = await hashClientIp("203.0.113.9", "2026-08-16", "test-secret");

  assert.equal(first, repeated);
  assert.notEqual(first, nextDay);
  assert.doesNotMatch(first, /203\.0\.113\.9/);
});

test("daily quota allows exactly ten requests and resets on the next UTC day", async () => {
  const { database } = createQuotaDatabase();
  const firstDay = new Date("2026-08-15T12:00:00.000Z");

  const attempts = await Promise.all(
    Array.from({ length: 11 }, () =>
      consumeDailyQuota({
        clientIp: "203.0.113.9",
        database,
        hashSecret: "test-secret",
        limit: 10,
        now: firstDay,
      }),
    ),
  );

  assert.equal(attempts.filter((attempt) => attempt.allowed).length, 10);
  assert.equal(attempts.filter((attempt) => !attempt.allowed).length, 1);

  const nextDayAttempt = await consumeDailyQuota({
    clientIp: "203.0.113.9",
    database,
    hashSecret: "test-secret",
    limit: 10,
    now: new Date("2026-08-16T00:00:00.000Z"),
  });

  assert.equal(nextDayAttempt.allowed, true);
});

test("Turnstile requires success, the chat action, and an approved hostname", async () => {
  const validFetch: typeof fetch = async (_input, init) => {
    const requestBody = init?.body as URLSearchParams;
    assert.equal(requestBody.get("remoteip"), "203.0.113.9");
    assert.equal(requestBody.get("response"), "fresh-token");

    return Response.json({ action: "chat_prompt", hostname: "theoryfoundry.com", success: true });
  };

  assert.deepEqual(
    await verifyTurnstileToken({
      clientIp: "203.0.113.9",
      fetchImpl: validFetch,
      hostnames: "theoryfoundry.com",
      secret: "test-secret",
      token: "fresh-token",
    }),
    { ok: true },
  );

  const wrongHostnameFetch: typeof fetch = async () =>
    Response.json({ action: "chat_prompt", hostname: "example.com", success: true });

  assert.deepEqual(
    await verifyTurnstileToken({
      clientIp: "203.0.113.9",
      fetchImpl: wrongHostnameFetch,
      hostnames: "theoryfoundry.com",
      secret: "test-secret",
      token: "fresh-token",
    }),
    { ok: false, reason: "invalid" },
  );
});

test("Turnstile fails closed when verification is unavailable", async () => {
  const unavailableFetch: typeof fetch = async () => {
    throw new Error("network unavailable");
  };

  assert.deepEqual(
    await verifyTurnstileToken({
      clientIp: "203.0.113.9",
      fetchImpl: unavailableFetch,
      hostnames: "theoryfoundry.com",
      secret: "test-secret",
      token: "fresh-token",
    }),
    { ok: false, reason: "unavailable" },
  );
});

test("Cloudflare's always-pass testing response is accepted only outside production", async () => {
  const testingFetch: typeof fetch = async () =>
    Response.json({
      hostname: "example.com",
      metadata: { result_with_testing_key: true },
      success: true,
    });

  assert.deepEqual(
    await verifyTurnstileToken({
      clientIp: "127.0.0.1",
      fetchImpl: testingFetch,
      hostnames: "localhost,127.0.0.1",
      secret: "1x0000000000000000000000000000000AA",
      token: "XXXX.DUMMY.TOKEN.XXXX",
    }),
    { ok: true },
  );
});
