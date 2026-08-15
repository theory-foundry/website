"use client";

import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { cn } from "@/lib/utils";
import { cjk } from "@streamdown/cjk";
import { code } from "@streamdown/code";
import { math } from "@streamdown/math";
import { mermaid } from "@streamdown/mermaid";
import type { UIMessage } from "ai";
import type { ButtonHTMLAttributes, ComponentProps, HTMLAttributes } from "react";
import { memo } from "react";
import { Streamdown } from "streamdown";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full flex-col gap-2",
      from === "user" ? "is-user items-end" : "is-assistant items-start",
      className,
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({ children, className, ...props }: MessageContentProps) => (
  <div
    className={cn(
      "min-w-0 max-w-full text-sm leading-7",
      "group-[.is-user]:max-w-[82%] group-[.is-user]:rounded-lg group-[.is-user]:rounded-br-sm group-[.is-user]:border group-[.is-user]:border-forest/10 group-[.is-user]:bg-cream group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-navy dark:group-[.is-user]:border-mint/25 dark:group-[.is-user]:bg-forest-deep dark:group-[.is-user]:text-cream",
      "group-[.is-assistant]:w-full group-[.is-assistant]:text-navy dark:group-[.is-assistant]:text-cream",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type MessageActionsProps = HTMLAttributes<HTMLDivElement>;

export const MessageActions = ({ className, children, ...props }: MessageActionsProps) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

export type MessageActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tooltip?: string;
  label?: string;
};

export const MessageAction = ({
  className,
  tooltip,
  label,
  children,
  type = "button",
  ...props
}: MessageActionProps) => (
  <button
    aria-label={label || tooltip}
    className={cn(
      `inline-flex items-center justify-center rounded-md border border-forest/10 bg-mist p-2 transition hover:bg-forest/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-forest-soft/70 dark:bg-night-raised dark:hover:border-mint/45 dark:hover:bg-night ${tw.TEXT_PRIMARY}`,
      className,
    )}
    title={tooltip}
    type={type}
    {...props}
  >
    {children}
  </button>
);

const streamdownPlugins = { cjk, code, math, mermaid };

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

export const MessageResponse = memo(
  ({ className, ...props }: MessageResponseProps) => (
    <Streamdown
      className={cn(
        "size-full break-words text-navy dark:text-cream [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:text-forest [&_a]:underline dark:[&_a]:text-mint [&_code]:rounded [&_code]:bg-forest/10 [&_code]:px-1.5 [&_code]:py-0.5 dark:[&_code]:bg-night-raised [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-forest/10 [&_pre]:p-4 dark:[&_pre]:bg-night",
        className,
      )}
      plugins={streamdownPlugins}
      {...props}
    />
  ),
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children && prevProps.isAnimating === nextProps.isAnimating,
);

MessageResponse.displayName = "MessageResponse";

export type MessageToolbarProps = HTMLAttributes<HTMLDivElement>;

export const MessageToolbar = ({ className, children, ...props }: MessageToolbarProps) => (
  <div className={cn("flex w-full items-center justify-between gap-4", className)} {...props}>
    {children}
  </div>
);
