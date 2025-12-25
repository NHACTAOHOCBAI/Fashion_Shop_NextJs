"use client";

import { useEffect, useRef, useState } from "react";
import {
  askChat,
  clearChatHistory,
  getChatHistory,
} from "@/services/chatbot.service";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { Button } from "@/components/ui/button";

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getChatHistory().then(setMessages);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    setLoading(true);

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await askChat(text);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.answer },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    await clearChatHistory();
    setMessages([]);
  };

  return (
    <div className="flex h-[480px] w-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <Button variant="outline" size="sm" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <ChatBubble role="assistant" content="Thinking..." />}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
}
