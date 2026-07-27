"use client";

import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import type { ChatStatus, UIMessage } from "ai";
import type { Ref } from "react";

import { ChatMessageList } from "./ChatMessageList";
import { ChatPromptInput } from "./ChatPromptInput";

type ChatConversationViewProps = {
  bottomRef: Ref<HTMLDivElement>;
  copyError: string | null;
  eyebrow?: string;
  hasError: boolean;
  input: string;
  inputPlaceholder?: string;
  isLoading: boolean;
  lastAssistantMessageId?: string;
  messages: UIMessage[];
  showLoadingMessage: boolean;
  status: ChatStatus;
  title?: string;
  onCopyResponse: (text: string) => void | Promise<void>;
  onInputChange: (value: string) => void;
  onNewChat: () => void;
  onRegenerate: () => void | Promise<void>;
  onStop: () => void;
  onSubmit: (message: PromptInputMessage) => void;
};

export function ChatConversationView({
  bottomRef,
  copyError,
  eyebrow = "RJLS product demo",
  hasError,
  input,
  inputPlaceholder = "Ask about RJLS, our services, or your product workflow...",
  isLoading,
  lastAssistantMessageId,
  messages,
  showLoadingMessage,
  status,
  title = "Ask RJLS—and see the integration work",
  onCopyResponse,
  onInputChange,
  onNewChat,
  onRegenerate,
  onStop,
  onSubmit,
}: ChatConversationViewProps) {
  return (
    <div
      className={`flex h-full min-h-[32rem] w-full flex-col overflow-hidden rounded-xl border border-forest/10 ${tw.BG_SECONDARY} shadow-[0_24px_70px_-34px_rgba(35,61,77,0.45)] dark:border-cream/20 dark:shadow-[0_24px_70px_-34px_rgba(33,94,97,0.42)]`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-forest/10 px-5 py-4 sm:px-6 dark:border-cream/20">
        <div>
          <p className={`font-mono text-xs ${tw.TEXT_SECONDARY}`}>{eyebrow}</p>
          <h2 className={`mt-1 text-lg font-semibold tracking-[-0.025em] ${tw.TEXT_PRIMARY}`}>{title}</h2>
        </div>
        <button
          className={`whitespace-nowrap rounded-md border border-forest/10 px-3 py-2 text-sm transition duration-200 hover:bg-forest/5 active:translate-y-px dark:border-cream/20 dark:hover:bg-cream/[0.12] ${tw.BTN_NONE}`}
          onClick={onNewChat}
          type="button"
        >
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
        <ChatMessageList
          bottomRef={bottomRef}
          copyError={copyError}
          lastAssistantMessageId={lastAssistantMessageId}
          messages={messages}
          showLoadingMessage={showLoadingMessage}
          onCopyResponse={onCopyResponse}
          onRegenerate={onRegenerate}
        />
      </div>

      <div className={`border-t border-forest/10 p-4 dark:border-cream/20 ${tw.BG_PRIMARY}`}>
        <ChatPromptInput
          className="mx-auto w-full max-w-3xl"
          input={input}
          isLoading={isLoading}
          onInputChange={onInputChange}
          onStop={onStop}
          onSubmit={onSubmit}
          placeholder={inputPlaceholder}
          status={status}
          textareaClassName="max-h-40 min-h-[3.25rem]"
        />
        {hasError && (
          <p className="mt-3 text-center text-sm text-red-700 dark:text-red-300">
            The assistant could not connect. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
