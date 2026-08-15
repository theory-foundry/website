"use client";

import { useChat } from "@ai-sdk/react";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { useEffect, useMemo, useRef, useState } from "react";

import { ChatConversationView } from "./ChatConversationView";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatTurnstile, type ChatTurnstileHandle } from "./ChatTurnstile";
import { chatTransport } from "./chat-config";
import { hasRenderableMessageContent } from "./chat-utils";

const CHAT_ERROR_MESSAGES = {
  CHAT_UNAVAILABLE: "The assistant is temporarily unavailable. Please try again later.",
  DAILY_LIMIT_REACHED: "This chat has reached its daily limit. Please try again tomorrow.",
  INVALID_REQUEST: "This conversation could not be sent. Start a new chat and try again.",
  TURNSTILE_FAILED: "We couldn't verify this request. Please try again.",
} as const;

type ChatErrorCode = keyof typeof CHAT_ERROR_MESSAGES;

function getChatErrorMessage(error: Error | undefined) {
  if (!error) {
    return null;
  }

  try {
    const response = JSON.parse(error.message) as { error?: { code?: string } };
    const code = response.error?.code;

    if (code && code in CHAT_ERROR_MESSAGES) {
      return CHAT_ERROR_MESSAGES[code as ChatErrorCode];
    }
  } catch {
    // Network and non-JSON failures use the same safe availability message.
  }

  return CHAT_ERROR_MESSAGES.CHAT_UNAVAILABLE;
}

export default function ChatUI() {
  const { messages, sendMessage, regenerate, setMessages, stop, status, error, clearError } = useChat({
    transport: chatTransport,
  });
  const [input, setInput] = useState("");
  const [copyError, setCopyError] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const verificationInProgressRef = useRef(false);
  const turnstileRef = useRef<ChatTurnstileHandle>(null);
  const hasMessages = messages.length > 0;
  const isLoading = status === "streaming" || status === "submitted";
  const lastMessage = messages[messages.length - 1];

  const lastAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );
  const showLoadingMessage =
    hasMessages && isLoading && (lastMessage?.role !== "assistant" || !hasRenderableMessageContent(lastMessage));

  useEffect(() => {
    if (error) {
      console.error("ERROR CALLING AI: ", error);
    }
  }, [error]);

  async function getTurnstileToken() {
    if (verificationInProgressRef.current) {
      return undefined;
    }

    const turnstile = turnstileRef.current;

    if (!turnstile) {
      setVerificationError(CHAT_ERROR_MESSAGES.TURNSTILE_FAILED);
      return undefined;
    }

    verificationInProgressRef.current = true;
    setVerificationError(null);
    clearError();
    setIsVerifying(true);

    try {
      return await turnstile.getToken();
    } catch (turnstileError) {
      console.error("Turnstile verification failed:", turnstileError);
      turnstile.reset();
      setVerificationError(CHAT_ERROR_MESSAGES.TURNSTILE_FAILED);
      return undefined;
    } finally {
      verificationInProgressRef.current = false;
      setIsVerifying(false);
    }
  }

  async function handleSubmit(message: PromptInputMessage) {
    const text = message.text.trim();

    if (!text || isLoading || isVerifying || verificationInProgressRef.current) {
      return;
    }

    setCopyError(null);
    const turnstileToken = await getTurnstileToken();

    if (!turnstileToken) {
      return;
    }

    setInput("");

    try {
      await sendMessage({ text }, { body: { turnstileToken } });
    } finally {
      turnstileRef.current?.reset();
    }
  }

  async function handleRegenerate() {
    if (isLoading || isVerifying || verificationInProgressRef.current) {
      return;
    }

    const turnstileToken = await getTurnstileToken();

    if (!turnstileToken) {
      return;
    }

    try {
      await regenerate({ body: { turnstileToken } });
    } finally {
      turnstileRef.current?.reset();
    }
  }

  async function handleCopyResponse(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyError(null);
    } catch (clipboardError) {
      console.error("Failed to copy response:", clipboardError);
      setCopyError("Could not copy response. Please copy it manually.");
    }
  }

  function handleNewChat() {
    stop();
    setMessages([]);
    setInput("");
    setCopyError(null);
    setVerificationError(null);
    clearError();
  }

  const errorMessage = verificationError ?? getChatErrorMessage(error);

  return (
    <>
      <ChatTurnstile ref={turnstileRef} />
      <div className="flex h-[40rem] w-full flex-1">
        {hasMessages ? (
          <ChatConversationView
            copyError={copyError}
            errorMessage={errorMessage}
            input={input}
            isLoading={isLoading}
            isVerifying={isVerifying}
            lastAssistantMessageId={lastAssistantMessage?.id}
            messages={messages}
            showLoadingMessage={showLoadingMessage}
            onCopyResponse={handleCopyResponse}
            onInputChange={setInput}
            onNewChat={handleNewChat}
            onRegenerate={handleRegenerate}
            onStop={stop}
            onSubmit={handleSubmit}
            status={status}
          />
        ) : (
          <ChatEmptyState
            errorMessage={errorMessage}
            input={input}
            isLoading={isLoading}
            isVerifying={isVerifying}
            onInputChange={setInput}
            onStop={stop}
            onSubmit={handleSubmit}
            status={status}
          />
        )}
      </div>
    </>
  );
}
