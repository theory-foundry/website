"use client";

import { DefaultChatTransport } from "ai";

export const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export const CHAT_PROMPT_MAX_LENGTH = 2000;

export const CHAT_SUGGESTIONS = [
  "Is our product a good fit for an AI interface?",
  "How would approved actions stay controlled?",
  "How do we start an exploratory conversation?",
];
