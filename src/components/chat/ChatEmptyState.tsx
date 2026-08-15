"use client";

import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import type { ChatStatus } from "ai";
import Image from "next/image";
import type { ReactNode } from "react";

import { ChatPromptInput } from "./ChatPromptInput";
import { CHAT_SUGGESTIONS } from "./chat-config";

type ChatEmptyStateProps = {
  errorMessage: string | null;
  input: string;
  isLoading: boolean;
  isVerifying?: boolean;
  placeholder?: string;
  suggestions?: string[];
  status: ChatStatus;
  title?: ReactNode;
  onInputChange: (value: string) => void;
  onStop: () => void;
  onSubmit: (message: PromptInputMessage) => void;
};

export function ChatEmptyState({
  errorMessage,
  input,
  isLoading,
  isVerifying = false,
  placeholder = "Ask about Theory Foundry, our services, or a workflow you want to improve...",
  suggestions = CHAT_SUGGESTIONS,
  status,
  title = (
    <>
      <Image alt="" aria-hidden className="h-14 w-14" height={56} src="/ai.svg" width={56} />
      Ask Theory Foundry
    </>
  ),
  onInputChange,
  onStop,
  onSubmit,
}: ChatEmptyStateProps) {
  return (
    <div className="flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-forest/10 bg-mist/90 shadow-[0_24px_70px_-34px_rgba(35,61,77,0.45)] dark:border-forest-soft/70 dark:bg-night-panel dark:shadow-[0_28px_80px_-34px_rgba(0,0,0,0.8)]">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-6 text-center sm:px-8">
        <h2
          className={`flex flex-col items-center gap-4 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl ${tw.TEXT_PRIMARY}`}
        >
          {title}
        </h2>
        <p className={`mt-3 max-w-md text-sm leading-6 ${tw.TEXT_SECONDARY}`}>
          Explore our services through our AI Agent
        </p>

        <ChatPromptInput
          className="mt-8 w-full max-w-2xl"
          input={input}
          isLoading={isLoading}
          isVerifying={isVerifying}
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
                className={`rounded-md border border-forest/10 bg-cream px-3 py-3 text-left text-xs leading-5 transition duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:bg-cream active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 dark:border-forest-soft/70 dark:bg-night dark:hover:border-mint/60 dark:hover:bg-night-raised ${tw.TEXT_SECONDARY}`}
                key={suggestion}
                disabled={isVerifying}
                onClick={() => onInputChange(suggestion)}
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {errorMessage && (
          <p className="mt-6 text-center text-sm text-red-700 dark:text-red-300" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
