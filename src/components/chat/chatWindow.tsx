"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, CheckCheck } from "lucide-react";
import axiosInstance from "@/config/axios";
import { socket } from "@/lib/socket2";

/* ================= TYPES ================= */
interface Message {
  id: number;
  content: string;
  createdAt: string;
  isSeen: boolean;
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

/* ================= UTILS ================= */
const shouldShowTime = (curr: Message, prev?: Message) => {
  if (!prev) return true;
  const diff =
    new Date(curr.createdAt).getTime() - new Date(prev.createdAt).getTime();
  return diff > 5 * 60 * 1000; // 5 phút
};

/* ================= COMPONENT ================= */
export default function ChatWindow({
  conversationId,
  currentUserId,
  headerUser,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  /* ================= LOAD + SOCKET ================= */
  useEffect(() => {
    if (!conversationId) return;

    // Load history
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
      socket.emit("leaveConversation", conversationId);
    };
  }, [conversationId]);

  /* ================= TYPING ================= */
  const onTyping = () => {
    socket.emit("typing", {
      conversationId,
      userId: currentUserId,
      isTyping: true,
    });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit("typing", {
        conversationId,
        userId: currentUserId,
        isTyping: false,
      });
    }, 1000);
  };

  useEffect(() => {
    const handler = ({
      userId,
      isTyping,
    }: {
      userId: number;
      isTyping: boolean;
    }) => {
      if (userId === currentUserId) return;
      setTypingUser(isTyping ? userId : null);
    };

    socket.on("typing", handler);

    return () => {
      socket.off("typing", handler);
    };
  }, [currentUserId]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  /* ================= SEND ================= */
  const sendMessage = async () => {
    if (!text.trim()) return;

    await axiosInstance.post("/chat/send", {
      conversationId,
      content: text,
    });

    setText("");
    inputRef.current?.focus();
  };

  const lastMyMessage = [...messages]
    .reverse()
    .find((m) => m.sender.id === currentUserId);

  /* ================= UI ================= */
  return (
    <div className="h-full flex flex-col rounded-xl border bg-background">
      {/* ===== HEADER ===== */}
      <div className="h-14 border-b px-4 flex items-center gap-3 shrink-0">
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
      <ScrollArea className="flex-1 px-4 py-3 overflow-y-auto">
        <div className="space-y-3">
          {messages.map((m, i) => {
            const prev = messages[i - 1];
            const isMe = m.sender.id === currentUserId;
            const showTime = shouldShowTime(m, prev);

            return (
              <div key={m.id} className="space-y-1">
                {showTime && (
                  <div className="text-center text-xs text-muted-foreground">
                    {new Date(m.createdAt).toLocaleString("vi-VN", {
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
                  <div
                    className={`max-w-[65%] rounded-2xl px-4 py-2 text-sm leading-relaxed
                      ${
                        isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                  >
                    {m.content}
                  </div>
                </div>

                {isMe && lastMyMessage?.id === m.id && (
                  <div className="flex justify-end text-xs text-muted-foreground gap-1">
                    <CheckCheck className="h-4 w-4" />
                    {m.isSeen ? "Đã xem" : "Đã gửi"}
                  </div>
                )}
              </div>
            );
          })}

          {typingUser && (
            <div className="text-xs text-muted-foreground animate-pulse">
              Đang nhập...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ===== INPUT ===== */}
      <div className="h-14 border-t px-3 flex items-center gap-2 py-2 shrink-0">
        <Input
          ref={inputRef}
          placeholder="Aa"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onTyping();
          }}
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
