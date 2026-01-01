"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCheck } from "lucide-react";
import { socket } from "@/lib/socket2";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useSendMessage, useMarkMessagesSeen } from "@/hooks/queries/useChat";
import { toast } from "sonner";

/* ================= TYPES ================= */
interface ChatHeaderUser {
  id: number;
  fullName: string;
  avatar?: string;
}

interface Props {
  conversationId: number;
  currentUserId: number;
  headerUser: ChatHeaderUser;
  initialMessages?: ChatMessage[];
}

/* ================= UTILS ================= */
const shouldShowTime = (curr: ChatMessage, prev?: ChatMessage) => {
  if (!prev) return true;
  const diff =
    new Date(curr.createdAt).getTime() - new Date(prev.createdAt).getTime();
  return diff > 5 * 60 * 1000; // 5 minutes
};

/* ================= COMPONENT ================= */
export default function ChatWindow({
  conversationId,
  currentUserId,
  headerUser,
  initialMessages = [],
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [typingUser, setTypingUser] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const sendMessageMutation = useSendMessage();
  const markSeenMutation = useMarkMessagesSeen();

  /* ================= LOAD + SOCKET ================= */
  useEffect(() => {
    if (!conversationId) return;

    // Update messages if initialMessages changes
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (!conversationId) return;

    socket.emit("joinConversation", conversationId);

    const onNewMessage = (msg: ChatMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });

      // Mark as seen if message is from other user
      if (msg.sender.id !== currentUserId) {
        markSeenMutation.mutate(conversationId);
      }
    };

    const onSeen = () => {
      setMessages((prev) =>
        prev.map((m) =>
          m.sender.id === currentUserId ? { ...m, isSeen: true } : m
        )
      );
    };

    socket.on("newMessage", onNewMessage);
    socket.on("seen", onSeen);

    // Mark messages as seen when opening conversation
    const unseenMessages = messages.filter(
      (m) => !m.isSeen && m.sender.id !== currentUserId
    );
    if (unseenMessages.length > 0) {
      markSeenMutation.mutate(conversationId);
    }

    return () => {
      socket.off("newMessage", onNewMessage);
      socket.off("seen", onSeen);
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

  /* ================= SEND MESSAGE ================= */
  const handleSendMessage = async (
    content: string,
    files?: {
      images?: File[];
      voice?: File;
      video?: File;
    }
  ) => {
    try {
      await sendMessageMutation.mutateAsync({
        dto: {
          conversationId,
          content: content || undefined,
        },
        files,
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to send message");
      throw error;
    }
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

                <MessageBubble message={m} isMe={isMe} />

                {isMe && lastMyMessage?.id === m.id && (
                  <div className="flex justify-end text-xs text-muted-foreground gap-1 items-center">
                    <CheckCheck className="h-3 w-3" />
                    {m.isSeen ? "Seen" : "Sent"}
                  </div>
                )}
              </div>
            );
          })}

          {typingUser && (
            <div className="text-xs text-muted-foreground animate-pulse">
              {headerUser.fullName} is typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ===== INPUT ===== */}
      <MessageInput
        onSend={handleSendMessage}
        onTyping={onTyping}
        disabled={sendMessageMutation.isPending}
        placeholder="Type a message..."
      />
    </div>
  );
}
