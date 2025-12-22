"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import axiosInstance from "@/config/axios";
import { socket } from "@/lib/socket2";

interface Message {
  id: number;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    fullName: string;
  };
}

interface ChatHeaderUser {
  id: number;
  fullName: string;
  avatar?: string;
}

interface Props {
  conversationId: number;
  currentUserId: number;
  headerUser: ChatHeaderUser;
}

export default function ChatWindow({
  conversationId,
  currentUserId,
  headerUser,
}: Props) {
  const [typingUser, setTypingUser] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout>();

  const onTyping = () => {
    socket.emit("typing", {
      conversationId,
      userId: currentUserId,
      isTyping: true,
    });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("typing", {
        conversationId,
        userId: currentUserId,
        isTyping: false,
      });
    }, 1000);
  };

  /* ================= LOAD MESSAGES ================= */
  useEffect(() => {
    if (!conversationId) return;

    axiosInstance
      .get(`/chat/conversations/${conversationId}/messages`)
      .then((res) => setMessages(res.data));

    socket.emit("joinConversation", conversationId);

    const onNewMessage = (msg: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    };

    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [conversationId]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= SEND ================= */
  const sendMessage = async () => {
    if (!text.trim()) return;

    await axiosInstance.post("/chat/send", {
      conversationId,
      content: text,
    });

    setText(""); // ✅ chỉ clear input
  };
  useEffect(() => {
    socket.on("typing", ({ userId, isTyping }) => {
      setTypingUser(isTyping ? userId : null);
    });

    return () => {
      socket.off("typing");
    };
  }, []);

  return (
    <div className="h-full flex flex-col rounded-xl border bg-background overflow-hidden">
      {/* ===== HEADER ===== */}
      <div className="h-14 border-b px-4 flex items-center gap-3">
        <Avatar>
          {headerUser.avatar ? (
            <img
              src={headerUser.avatar}
              alt={headerUser.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <AvatarFallback>{headerUser.fullName.charAt(0)}</AvatarFallback>
          )}
        </Avatar>

        <div>
          <p className="text-sm font-medium">{headerUser.fullName}</p>
          <p className="text-xs text-muted-foreground">Đang hoạt động</p>
        </div>
      </div>

      {/* ===== MESSAGES ===== */}
      <ScrollArea className="flex-1 px-4 py-3">
        <div className="space-y-3">
          {messages.map((m) => {
            const isMe = m.sender.id === currentUserId;

            return (
              <div
                key={m.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[65%] rounded-2xl px-4 py-2 text-sm leading-relaxed
                    ${
                      isMe
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    }`}
                >
                  {m.content}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ===== INPUT ===== */}
      <div className="h-14 border-t px-3 flex items-center gap-2">
        <Input
          placeholder="Aa"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onTyping();
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="rounded-full"
        />
        <Button size="icon" onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
