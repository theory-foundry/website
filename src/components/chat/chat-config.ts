"use client";

import { DefaultChatTransport } from "ai";

export const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export const CHAT_PROMPT_MAX_LENGTH = 2000;

export const CHAT_SUGGESTIONS = [
  "How can RJLS help us adopt AI safely?",
  "What happens in an AI readiness audit?",
  "How do we control AI cost and output quality?",
];
