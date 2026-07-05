"use client";

import dynamic from "next/dynamic";

const ChatUI = dynamic(() => import("@/components/chat/ChatUI"), { ssr: false });

export function HomeChat() {
  return <ChatUI />;
}
