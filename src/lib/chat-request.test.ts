import assert from "node:assert/strict";
import test from "node:test";

import { parseChatRequest } from "./chat-request.ts";

const textMessage = (text: string, role: "assistant" | "user" = "user") => ({
  id: crypto.randomUUID(),
  parts: [{ text, type: "text" as const }],
  role,
});

const requestWith = (body: unknown, headers?: HeadersInit) =>
  new Request("https://theoryfoundry.com/api/chat", {
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", ...headers },
    method: "POST",
  });

test("rejects a request whose declared body length exceeds the limit", async () => {
  const result = await parseChatRequest(requestWith({}, { "content-length": String(32 * 1024 + 1) }));

  assert.deepEqual(result, {
    error: { code: "INVALID_REQUEST", message: "The chat request is too large.", status: 413 },
    ok: false,
  });
});

test("rejects malformed JSON and missing messages with the existing error contract", async () => {
  const malformed = new Request("https://theoryfoundry.com/api/chat", { body: "{", method: "POST" });

  assert.deepEqual(await parseChatRequest(malformed), {
    error: { code: "INVALID_REQUEST", message: "The chat request is invalid.", status: 400 },
    ok: false,
  });
  assert.deepEqual(await parseChatRequest(requestWith({ messages: [] })), {
    error: { code: "INVALID_REQUEST", message: "No messages provided.", status: 400 },
    ok: false,
  });
});

test("rejects oversized conversations and final user messages", async () => {
  const longConversation = Array.from({ length: 7 }, () => textMessage("x".repeat(2000)));

  assert.equal((await parseChatRequest(requestWith({ messages: longConversation }))).ok, false);
  assert.deepEqual(await parseChatRequest(requestWith({ messages: [textMessage("x".repeat(2001))] })), {
    error: {
      code: "INVALID_REQUEST",
      message: "Message too long. Please keep it under 2000 characters.",
      status: 400,
    },
    ok: false,
  });
});

test("trims history to twenty messages and preserves the Turnstile token", async () => {
  const messages = Array.from({ length: 21 }, (_, index) => textMessage(`message-${index}`));
  const result = await parseChatRequest(requestWith({ messages, turnstileToken: "fresh-token" }));

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.messages.length, 20);
  assert.equal(result.messages[0]?.parts[0]?.type, "text");
  assert.equal(result.messages[0]?.parts[0]?.type === "text" && result.messages[0].parts[0].text, "message-1");
  assert.equal(result.turnstileToken, "fresh-token");
});
