"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Trash2 } from "lucide-react";
import { askChat, getChatHistory, clearChatHistory } from "@/services/chatbot.service";
import ProductCard from "@/components/chat/ProductCard";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/* ================= UTILS ================= */
const shouldShowTime = (curr: BotMessage, prev?: BotMessage) => {
  if (!curr.createdAt) return false;
  if (!prev?.createdAt) return true;
  const diff =
    new Date(curr.createdAt).getTime() - new Date(prev.createdAt).getTime();
  return diff > 5 * 60 * 1000;
};

/* ================= COMPONENT ================= */
export default function ChatbotWindow() {
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ================= LOAD ================= */
  useEffect(() => {
    getChatHistory().then(setMessages);
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ================= SEND ================= */
  const sendMessage = async () => {
    if (!text.trim()) return;

    const userMsg: BotMessage = {
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setText("");
    setTyping(true);

    const res = await askChat(userMsg.content);

    setTyping(false);

    const botMsg: BotMessage = {
      role: "assistant",
      content: res.answer,
      products: res.products || [],
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, botMsg]);
    inputRef.current?.focus();
  };

  /* ================= CLEAR HISTORY ================= */
  const handleClearHistory = async () => {
    try {
      await clearChatHistory();
      setMessages([]);
      toast.success("Chat history cleared successfully");
    } catch (error) {
      toast.error("Failed to clear chat history");
      console.error(error);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="flex flex-col h-full max-h-[80vh] min-h-[400px]">
      {/* ===== HEADER ===== */}
      <div className="h-14 border-b px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">AI Assistant</p>
            <p className="text-xs text-muted-foreground">
              {typing ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        
        {/* Clear History Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2 mr-8"
              disabled={messages.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              <span className="text-xs">Clear</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear chat history?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all your chat messages with the AI assistant.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearHistory}>
                Clear
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* ===== MESSAGES ===== */}
      <ScrollArea className="flex-1 px-4 py-3 overflow-y-auto">
        <div className="space-y-3">
          {messages.map((m, i) => {
            const prev = messages[i - 1];
            const isMe = m.role === "user";
            const showTime = shouldShowTime(m, prev);

            return (
              <div key={i} className="space-y-1">
                {showTime && (
                  <div className="text-center text-xs text-muted-foreground">
                    {new Date(m.createdAt!).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </div>
                )}

                <div
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[75%] space-y-3`}>
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                        isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {m.content}
                    </div>

                    {/* Display Products if available */}
                    {!isMe && m.products && m.products.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {m.products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {typing && (
            <div className="text-xs text-muted-foreground animate-pulse">
              Typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ===== INPUT ===== */}
      <div className="h-14 border-t px-3 flex items-center gap-2 py-2 shrink-0">
        <Input
          ref={inputRef}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="rounded-full"
        />
        <Button size="icon" onClick={sendMessage} disabled={!text.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
