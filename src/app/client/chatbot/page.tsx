// ===============================
// FILE: app/chatbot/page.tsx
// ===============================
"use client";

export default function Page() {
  return <ChatbotPage />;
}

// ===============================
// FILE: features/chatbot/ChatbotPage.tsx
// ===============================

import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axiosInstance from "@/config/axios";

interface ChatMessage {
  id?: number;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* ================= FETCH HISTORY ================= */
  useEffect(() => {
    axiosInstance.get("/chatbot/history").then((res) => {
      setMessages(res.data || []);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/chatbot/ask", {
        question: input,
      });

      const botMsg: ChatMessage = {
        role: "assistant",
        content: res.data?.answer || res.data?.content || "...",
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CLEAR HISTORY ================= */
  const clearHistory = async () => {
    await axiosInstance.delete("/chatbot/history");
    setMessages([]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted p-4">
      <Card className="w-full max-w-3xl h-[85vh] flex flex-col rounded-2xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Bot className="w-5 h-5" /> AI Assistant
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearHistory}
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5 text-destructive" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full p-4 space-y-4">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </ScrollArea>
        </CardContent>

        <div className="border-t p-4 flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
          isUser ? "bg-primary text-primary-foreground" : "bg-background border"
        }`}
      >
        <div className="flex items-center gap-2 mb-1 opacity-70">
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          <span className="text-xs">{isUser ? "You" : "AI"}</span>
        </div>
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-background border rounded-2xl px-4 py-2 text-sm opacity-70">
        AI is typing...
      </div>
    </div>
  );
}
