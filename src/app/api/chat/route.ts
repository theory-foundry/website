import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createUIMessageStreamResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

import {
  consumeDailyQuota,
  deleteExpiredQuotaRecords,
  getClientIp,
  getDailyLimit,
  verifyTurnstileToken,
} from "@/lib/chat-abuse-protection";
import { parseChatRequest } from "@/lib/chat-request";
import { createChatMessageStream } from "@/lib/chat-stream";

import { startChatAgentStream } from "./chat-agent";

type ChatErrorCode = "CHAT_UNAVAILABLE" | "DAILY_LIMIT_REACHED" | "INVALID_REQUEST" | "TURNSTILE_FAILED";

const createErrorResponse = ({
  code,
  message,
  resetAt,
  status,
}: {
  code: ChatErrorCode;
  message: string;
  resetAt?: string;
  status: number;
}) => {
  const headers = new Headers();

  if (resetAt) {
    const retryAfterSeconds = Math.max(1, Math.ceil((new Date(resetAt).getTime() - Date.now()) / 1000));
    headers.set("Retry-After", String(retryAfterSeconds));
  }

  return NextResponse.json({ error: { code, message, ...(resetAt ? { resetAt } : {}) } }, { headers, status });
};

const unavailableResponse = () =>
  createErrorResponse({
    code: "CHAT_UNAVAILABLE",
    message: "The assistant is temporarily unavailable. Please try again later.",
    status: 503,
  });

export async function POST(request: NextRequest) {
  try {
    const parsedRequest = await parseChatRequest(request);
    if (!parsedRequest.ok) {
      return createErrorResponse(parsedRequest.error);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return unavailableResponse();
    }

    const clientIp = getClientIp(request);
    const ipHashSecret = process.env.CHAT_IP_HASH_SECRET;
    let cloudflareContext: Awaited<ReturnType<typeof getCloudflareContext<{ asn?: number }>>>;
    let dailyLimit: number;

    try {
      cloudflareContext = await getCloudflareContext<{ asn?: number }>({ async: true });
      dailyLimit = getDailyLimit();
    } catch {
      return unavailableResponse();
    }

    const rateLimitDatabase = cloudflareContext.env.CHAT_RATE_LIMIT_DB;
    if (!clientIp || !ipHashSecret || !rateLimitDatabase) {
      return unavailableResponse();
    }

    const turnstileResult = await verifyTurnstileToken({
      clientIp,
      token: parsedRequest.turnstileToken,
    });
    if (!turnstileResult.ok) {
      const verificationFailed = turnstileResult.reason === "invalid";
      return createErrorResponse({
        code: verificationFailed ? "TURNSTILE_FAILED" : "CHAT_UNAVAILABLE",
        message: verificationFailed
          ? "Verification failed. Please try again."
          : "The assistant is temporarily unavailable. Please try again later.",
        status: verificationFailed ? 403 : 503,
      });
    }

    let quota;
    try {
      quota = await consumeDailyQuota({
        clientIp,
        database: rateLimitDatabase,
        hashSecret: ipHashSecret,
        limit: dailyLimit,
      });
    } catch {
      return unavailableResponse();
    }

    if (!quota.allowed) {
      return createErrorResponse({
        code: "DAILY_LIMIT_REACHED",
        message: "This network has reached the daily demo limit. Please try again after 00:00 UTC.",
        resetAt: quota.resetAt,
        status: 429,
      });
    }

    cloudflareContext.ctx.waitUntil(
      deleteExpiredQuotaRecords(rateLimitDatabase).catch(() => {
        console.error("[/api/chat] quota retention cleanup failed");
      }),
    );

    const agentStream = await startChatAgentStream({ apiKey, messages: parsedRequest.messages });

    return createUIMessageStreamResponse({
      headers: {
        "RateLimit-Limit": String(quota.limit),
        "RateLimit-Remaining": String(quota.remaining),
        "RateLimit-Reset": String(Math.floor(new Date(quota.resetAt).getTime() / 1000)),
      },
      stream: createChatMessageStream(agentStream as AsyncIterable<unknown>),
    });
  } catch (error) {
    console.error("[/api/chat] error:", error);
    return unavailableResponse();
  }
}
