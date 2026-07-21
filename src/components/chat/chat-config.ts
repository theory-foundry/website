"use client";

import { DefaultChatTransport } from "ai";

export const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export const CHAT_PROMPT_MAX_LENGTH = 2000;

export const CHAT_SUGGESTIONS = [
  "How could AI chat connect to our business systems?",
  "Can an AI assistant safely update our records?",
  "What would RJLS build for us?",
];
