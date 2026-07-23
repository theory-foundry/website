"use client";

import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import type { ChatStatus } from "ai";
import Image from "next/image";
import type { ReactNode } from "react";

import { ChatPromptInput } from "./ChatPromptInput";
import { CHAT_SUGGESTIONS } from "./chat-config";

type ChatEmptyStateProps = {
  hasError: boolean;
  input: string;
  isLoading: boolean;
  placeholder?: string;
  suggestions?: string[];
  status: ChatStatus;
  title?: ReactNode;
  onInputChange: (value: string) => void;
  onStop: () => void;
  onSubmit: (message: PromptInputMessage) => void;
};

export function ChatEmptyState({
  hasError,
  input,
  isLoading,
  placeholder = "Ask about connecting AI chat to your application, APIs, or data...",
  suggestions = CHAT_SUGGESTIONS,
  status,
  title = (
    <>
      <Image alt="RJLS assistant" className="h-8 w-auto" height={32} src="/ai.svg" width={32} />
      Ask RJLS about AI integration
    </>
  ),
  onInputChange,
  onStop,
  onSubmit,
}: ChatEmptyStateProps) {
  return (
    <div className="flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-zinc-900/10 bg-zinc-100/90 shadow-[0_24px_70px_-34px_rgba(24,24,27,0.45)] dark:border-white/10 dark:bg-zinc-900/90 dark:shadow-[0_24px_70px_-34px_rgba(13,148,136,0.32)]">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-12 text-center sm:px-8">
        <h2
          className={`flex items-center gap-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl ${tw.TEXT_PRIMARY}`}
        >
          {title}
        </h2>
        <p className={`mt-4 max-w-md text-sm leading-6 ${tw.TEXT_SECONDARY}`}>
          Explore how a governed assistant could work with your applications, APIs, and data.
        </p>

        <ChatPromptInput
          className="mt-8 w-full max-w-2xl"
          input={input}
          isLoading={isLoading}
          onInputChange={onInputChange}
          onStop={onStop}
          onSubmit={onSubmit}
          placeholder={placeholder}
          status={status}
          textareaClassName="max-h-40 min-h-[4rem] text-base"
        />

        {suggestions.length > 0 && (
          <div className="mt-5 grid w-full max-w-2xl gap-2 sm:grid-cols-3">
            {suggestions.map((suggestion) => (
              <button
                className={`rounded-md border border-zinc-900/10 bg-zinc-50 px-3 py-3 text-left text-xs leading-5 transition duration-200 hover:-translate-y-0.5 hover:border-teal-700/35 hover:bg-white active:translate-y-px dark:border-white/10 dark:bg-zinc-950 dark:hover:border-teal-300/35 dark:hover:bg-zinc-950 ${tw.TEXT_SECONDARY}`}
                key={suggestion}
                onClick={() => onInputChange(suggestion)}
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {hasError && (
          <p className="mt-6 text-center text-sm text-red-700 dark:text-red-300">
            The assistant could not connect. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
