"use client";

import { DefaultChatTransport } from "ai";

export const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export const CHAT_PROMPT_MAX_LENGTH = 2000;

export const CHAT_SUGGESTIONS = [
  "What does RJLS build for product companies?",
  "How can an assistant use tools without unrestricted access?",
  "How do you test and control an AI integration?",
];
