"use client";

import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import type { ChatStatus } from "ai";
import { Loader2Icon } from "lucide-react";

import { CHAT_PROMPT_MAX_LENGTH } from "./chat-config";

type ChatPromptInputProps = {
  className?: string;
  input: string;
  isLoading: boolean;
  isVerifying?: boolean;
  placeholder: string;
  status: ChatStatus;
  textareaClassName?: string;
  onInputChange: (value: string) => void;
  onStop: () => void;
  onSubmit: (message: PromptInputMessage) => void;
};

export function ChatPromptInput({
  className,
  input,
  isLoading,
  isVerifying = false,
  placeholder,
  status,
  textareaClassName,
  onInputChange,
  onStop,
  onSubmit,
}: ChatPromptInputProps) {
  return (
    <PromptInput className={className} onSubmit={onSubmit}>
      <PromptInputBody>
        <PromptInputTextarea
          autoComplete="off"
          className={textareaClassName}
          disabled={isLoading || isVerifying}
          maxLength={CHAT_PROMPT_MAX_LENGTH}
          onChange={(event) => onInputChange(event.currentTarget.value)}
          placeholder={placeholder}
          value={input}
        />
      </PromptInputBody>
      <PromptInputFooter>
        <p className={`text-xs ${tw.TEXT_SECONDARY}`}>
          {input.length}/{CHAT_PROMPT_MAX_LENGTH}
        </p>
        <PromptInputSubmit
          aria-label={isVerifying ? "Verifying request" : undefined}
          disabled={isVerifying || (!input.trim() && !isLoading)}
          onStop={onStop}
          status={status}
        >
          {isVerifying ? <Loader2Icon className="size-4 animate-spin" /> : undefined}
        </PromptInputSubmit>
      </PromptInputFooter>
    </PromptInput>
  );
}
