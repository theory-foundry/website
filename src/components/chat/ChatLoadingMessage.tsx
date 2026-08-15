"use client";

import { Message, MessageContent } from "@/components/ai-elements/message";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export function ChatLoadingMessage() {
  return (
    <Message from="assistant">
      <MessageContent className="max-w-none space-y-3">
        <div className={`font-mono text-[11px] font-medium ${tw.TEXT_SECONDARY}`}>Assistant</div>
        <div
          aria-live="polite"
          aria-label="Assistant is responding"
          className={`relative inline-flex min-w-[12rem] overflow-hidden rounded-lg rounded-bl-sm border border-forest/10 bg-mist px-4 py-3 text-sm dark:border-forest-soft/70 dark:bg-night-raised ${tw.TEXT_PRIMARY}`}
          role="status"
        >
          <span className="sr-only">Assistant is responding</span>
          <span className="loading-shimmer pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(35,61,77,0.02)_35%,rgba(33,94,97,0.16)_50%,rgba(35,61,77,0.02)_65%,transparent_100%)] motion-reduce:hidden dark:bg-[linear-gradient(110deg,transparent_0%,rgba(245,251,230,0.03)_35%,rgba(143,182,160,0.2)_50%,rgba(245,251,230,0.03)_65%,transparent_100%)]" />
          <span className="relative font-medium tracking-[0.01em]">Thinking</span>
        </div>
        <style jsx>{`
          .loading-shimmer {
            transform: translateX(-160%);
            animation: loading-shimmer 2.2s ease-in-out infinite;
          }

          @keyframes loading-shimmer {
            from {
              transform: translateX(-160%);
            }

            to {
              transform: translateX(160%);
            }
          }
        `}</style>
      </MessageContent>
    </Message>
  );
}
