import { isToolUIPart, type UIMessage } from "ai";

import { readBoundedRequestBody } from "./chat-abuse-protection.ts";

const MAX_INPUT_LENGTH = 2000;
const MAX_REQUEST_BODY_BYTES = 32 * 1024;
const MAX_TOTAL_TEXT_LENGTH = 12_000;
const MAX_MESSAGES = 20;

type ChatRequestError = {
  code: "INVALID_REQUEST";
  message: string;
  status: 400 | 413;
};

type ChatRequestResult =
  { error: ChatRequestError; ok: false } | { messages: UIMessage[]; ok: true; turnstileToken: unknown };

const getTotalTextLength = (messages: UIMessage[]): number =>
  messages.reduce(
    (messageTotal, message) =>
      messageTotal +
      message.parts.reduce(
        (partTotal, part) =>
          partTotal +
          (part && typeof part === "object" && "type" in part && part.type === "text" && "text" in part
            ? typeof part.text === "string"
              ? part.text.length
              : 0
            : 0),
        0,
      ),
    0,
  );

const normalizeToolInputs = (messages: UIMessage[]): UIMessage[] =>
  messages.map((message) => {
    if (message.role !== "assistant") {
      return message;
    }

    return {
      ...message,
      parts: message.parts.map((part) => {
        if (!isToolUIPart(part) || part.input !== undefined) {
          return part;
        }

        return {
          ...part,
          input: "rawInput" in part ? part.rawInput : {},
        };
      }),
    };
  });

const invalidRequest = (message: string, status: 400 | 413 = 400): ChatRequestResult => ({
  error: { code: "INVALID_REQUEST", message, status },
  ok: false,
});

export async function parseChatRequest(request: Request): Promise<ChatRequestResult> {
  const declaredBodyLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredBodyLength) && declaredBodyLength > MAX_REQUEST_BODY_BYTES) {
    return invalidRequest("The chat request is too large.", 413);
  }

  const rawBody = await readBoundedRequestBody(request.body, MAX_REQUEST_BODY_BYTES);
  if (rawBody === null) {
    return invalidRequest("The chat request is too large.", 413);
  }

  let body: Record<string, unknown>;
  try {
    const parsedBody = JSON.parse(rawBody) as unknown;
    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      throw new Error("Invalid body");
    }
    body = parsedBody as Record<string, unknown>;
  } catch {
    return invalidRequest("The chat request is invalid.");
  }

  const uiMessages = body.messages as UIMessage[] | undefined;
  if (!Array.isArray(uiMessages) || uiMessages.length === 0) {
    return invalidRequest("No messages provided.");
  }

  const messages = normalizeToolInputs(uiMessages.slice(-MAX_MESSAGES));
  if (getTotalTextLength(messages) > MAX_TOTAL_TEXT_LENGTH) {
    return invalidRequest("The conversation is too long. Start a new chat and try again.");
  }

  const lastMessage = messages[messages.length - 1];
  const lastTextPart = lastMessage?.parts?.find((part: { type: string }) => part.type === "text") as
    { text: string; type: "text" } | undefined;

  if (lastMessage?.role !== "user" || !lastTextPart?.text) {
    return invalidRequest("Invalid message format.");
  }

  if (lastTextPart.text.length > MAX_INPUT_LENGTH) {
    return invalidRequest("Message too long. Please keep it under 2000 characters.");
  }

  return { messages, ok: true, turnstileToken: body.turnstileToken };
}
