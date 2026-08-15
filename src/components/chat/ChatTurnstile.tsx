"use client";

import Script from "next/script";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

type TurnstileWidgetId = string;

type PendingVerification = {
  reject: (error: Error) => void;
  resolve: (token: string) => void;
  timeoutId: number;
};

type TurnstileApi = {
  execute: (widgetId: TurnstileWidgetId) => void;
  remove: (widgetId: TurnstileWidgetId) => void;
  render: (
    container: HTMLElement,
    options: {
      action: string;
      appearance: "interaction-only";
      callback: (token: string) => void;
      "error-callback": () => void;
      execution: "execute";
      "expired-callback": () => void;
      "response-field": false;
      sitekey: string;
      "timeout-callback": () => void;
    },
  ) => TurnstileWidgetId;
  reset: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type ChatTurnstileHandle = {
  getToken: () => Promise<string>;
  reset: () => void;
};

const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_CLIENT_TIMEOUT_MS = 120_000;

export const ChatTurnstile = forwardRef<ChatTurnstileHandle>(function ChatTurnstile(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingVerificationRef = useRef<PendingVerification | null>(null);
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const rejectPendingVerification = useCallback(() => {
    const pendingVerification = pendingVerificationRef.current;

    if (pendingVerification) {
      window.clearTimeout(pendingVerification.timeoutId);
      pendingVerification.reject(new Error("Turnstile verification failed"));
    }

    pendingVerificationRef.current = null;
  }, []);

  const reset = useCallback(() => {
    rejectPendingVerification();

    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [rejectPendingVerification]);

  const renderWidget = useCallback(() => {
    if (!sitekey || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      action: "chat_prompt",
      appearance: "interaction-only",
      callback: (token) => {
        const pendingVerification = pendingVerificationRef.current;

        if (pendingVerification) {
          window.clearTimeout(pendingVerification.timeoutId);
          pendingVerification.resolve(token);
        }

        pendingVerificationRef.current = null;
      },
      "error-callback": rejectPendingVerification,
      execution: "execute",
      "expired-callback": rejectPendingVerification,
      "response-field": false,
      sitekey,
      "timeout-callback": rejectPendingVerification,
    });
  }, [rejectPendingVerification, sitekey]);

  useImperativeHandle(
    ref,
    () => ({
      getToken: () => {
        const widgetId = widgetIdRef.current;

        if (!sitekey || !widgetId || !window.turnstile || pendingVerificationRef.current) {
          return Promise.reject(new Error("Turnstile is unavailable"));
        }

        window.turnstile.reset(widgetId);

        const tokenPromise = new Promise<string>((resolve, reject) => {
          const timeoutId = window.setTimeout(rejectPendingVerification, TURNSTILE_CLIENT_TIMEOUT_MS);
          pendingVerificationRef.current = { reject, resolve, timeoutId };
        });

        window.turnstile.execute(widgetId);
        return tokenPromise;
      },
      reset,
    }),
    [rejectPendingVerification, reset, sitekey],
  );

  useEffect(
    () => () => {
      rejectPendingVerification();

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    },
    [rejectPendingVerification],
  );

  return (
    <>
      <Script onReady={renderWidget} src={TURNSTILE_SCRIPT_URL} strategy="afterInteractive" />
      <div className="fixed bottom-4 right-4 z-50" ref={containerRef} />
    </>
  );
});
