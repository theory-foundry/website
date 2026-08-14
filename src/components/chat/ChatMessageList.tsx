"use client";

import type { UIMessage } from "ai";

import { ChatLoadingMessage } from "./ChatLoadingMessage";
import { ChatMessage } from "./ChatMessage";

type ChatMessageListProps = {
  copyError: string | null;
  lastAssistantMessageId?: string;
  messages: UIMessage[];
  showLoadingMessage: boolean;
  onCopyResponse: (text: string) => void | Promise<void>;
  onRegenerate: () => void | Promise<void>;
};

export function ChatMessageList({
  copyError,
  lastAssistantMessageId,
  messages,
  showLoadingMessage,
  onCopyResponse,
  onRegenerate,
}: ChatMessageListProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      {messages.map((message) => (
        <ChatMessage
          copyError={copyError}
          isLatestAssistantMessage={lastAssistantMessageId === message.id}
          key={message.id}
          message={message}
          onCopyResponse={onCopyResponse}
          onRegenerate={onRegenerate}
        />
      ))}
      {showLoadingMessage && <ChatLoadingMessage />}
    </div>
  );
}
