"use client";

import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { cn } from "@/lib/utils";
import type { ChatStatus, FileUIPart } from "ai";
import { CornerDownLeftIcon, Loader2Icon, SquareIcon, XIcon } from "lucide-react";
import type {
  ButtonHTMLAttributes,
  FormEvent,
  FormHTMLAttributes,
  HTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useCallback } from "react";

export interface PromptInputMessage {
  text: string;
  files: FileUIPart[];
}

export type PromptInputProps = Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  onSubmit: (message: PromptInputMessage, event: FormEvent<HTMLFormElement>) => void | Promise<void>;
};

export const PromptInput = ({ className, onSubmit, children, ...props }: PromptInputProps) => {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const text = formData.get("prompt");

      void onSubmit(
        {
          text: typeof text === "string" ? text : "",
          files: [],
        },
        event,
      );
    },
    [onSubmit],
  );

  return (
    <form
      className={cn(
        `rounded-lg border border-forest/10 p-3 shadow-[0_14px_40px_-26px_rgba(35,61,77,0.55)] transition focus-within:border-forest/45 focus-within:ring-2 focus-within:ring-forest/10 dark:border-cream/20 dark:shadow-[0_14px_40px_-26px_rgba(33,94,97,0.42)] dark:focus-within:border-mint/45 dark:focus-within:ring-mint/10 ${tw.BG_SECONDARY}`,
        className,
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  );
};

export type PromptInputBodyProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputBody = ({ className, ...props }: PromptInputBodyProps) => (
  <div className={cn("flex items-center gap-3", className)} {...props} />
);

export type PromptInputTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const PromptInputTextarea = ({
  className,
  name = "prompt",
  onKeyDown,
  rows = 1,
  ...props
}: PromptInputTextareaProps) => {
  const handleKeyDown = useCallback<NonNullable<TextareaHTMLAttributes<HTMLTextAreaElement>["onKeyDown"]>>(
    (event) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        event.currentTarget.form?.requestSubmit();
      }
    },
    [onKeyDown],
  );

  return (
    <textarea
      className={cn(
        `min-h-[3.25rem] w-full resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-forest-soft dark:placeholder:text-sage ${tw.TEXT_PRIMARY}`,
        className,
      )}
      name={name}
      onKeyDown={handleKeyDown}
      rows={rows}
      {...props}
    />
  );
};

export type PromptInputFooterProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputFooter = ({ className, ...props }: PromptInputFooterProps) => (
  <div
    className={cn(
      "mt-2 flex items-center justify-between gap-3 border-t border-forest/10 pt-3 dark:border-cream/20",
      className,
    )}
    {...props}
  />
);

export type PromptInputSubmitProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  status?: ChatStatus;
  onStop?: () => void;
};

export const PromptInputSubmit = ({
  className,
  children,
  status,
  onClick,
  onStop,
  ...props
}: PromptInputSubmitProps) => {
  const isGenerating = status === "submitted" || status === "streaming";

  let icon = <CornerDownLeftIcon className="size-4" />;

  if (status === "submitted") {
    icon = <Loader2Icon className="size-4 animate-spin" />;
  } else if (status === "streaming") {
    icon = <SquareIcon className="size-4" />;
  } else if (status === "error") {
    icon = <XIcon className="size-4" />;
  }

  const handleClick = useCallback<NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["onClick"]>>(
    (event) => {
      if (isGenerating && onStop) {
        event.preventDefault();
        onStop();
        return;
      }

      onClick?.(event);
    },
    [isGenerating, onClick, onStop],
  );

  return (
    <button
      aria-label={isGenerating ? "Stop" : "Submit"}
      className={cn(
        `inline-flex size-9 items-center justify-center rounded-md transition duration-200 hover:-translate-y-0.5 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 ${tw.BTN_PRIMARY}`,
        className,
      )}
      onClick={handleClick}
      type={isGenerating && onStop ? "button" : "submit"}
      {...props}
    >
      {children ?? icon}
    </button>
  );
};
