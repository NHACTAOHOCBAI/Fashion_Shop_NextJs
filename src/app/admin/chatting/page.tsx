"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";

// ================= TYPES =================
type Role = "USER" | "ADMIN";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
}

interface Message {
  id: string;
  sender: Role;
  content: string;
  createdAt: string;
  isRead: boolean;
}

// ================= API (mock – replace by real API) =================
async function fetchConversations(): Promise<Conversation[]> {
  return [
    {
      id: "conv_1",
      name: "Admin CSKH",
      lastMessage: "Đơn hàng của tôi bị trễ",
      unread: 1,
    },
  ];
}

async function fetchMessages(conversationId: string): Promise<Message[]> {
  return [
    {
      id: "msg_1",
      sender: "ADMIN",
      content: "Xin chào 👋 Tôi có thể hỗ trợ gì cho bạn?",
      createdAt: new Date().toISOString(),
      isRead: true,
    },
  ];
}

async function sendMessageAPI(conversationId: string, content: string) {
  return {
    id: crypto.randomUUID(),
    sender: "USER" as Role,
    content,
    createdAt: new Date().toISOString(),
    isRead: false,
  } as Message;
}

async function markReadAPI(conversationId: string) {
  return true;
}

// ================= PAGE =================
export default function MessengerWithLogic() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load conversations
  useEffect(() => {
    fetchConversations().then((data) => {
      setConversations(data);
      setActiveConv(data[0]);
    });
  }, []);

  // Load messages when change conversation
  useEffect(() => {
    if (!activeConv) return;
    fetchMessages(activeConv.id).then((data) => setMessages(data));
    markReadAPI(activeConv.id);
  }, [activeConv]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !activeConv) return;

    const newMsg = await sendMessageAPI(activeConv.id, text);
    setMessages((prev) => [...prev, newMsg]);
    setText("");
  };

  return (
    <div className="h-[80vh] w-full border rounded-xl flex bg-background">
      {/* ===== Sidebar ===== */}
      <div className="w-[300px] border-r flex flex-col">
        <div className="p-3 border-b flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm" className="h-8" />
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveConv(c)}
              className={`p-3 cursor-pointer hover:bg-muted ${
                activeConv?.id === c.id && "bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {c.lastMessage}
                  </p>
                </div>
                {c.unread > 0 && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* ===== Chat Area ===== */}
      <div className="flex-1 flex flex-col">
        {activeConv && (
          <>
            <div className="p-3 border-b flex items-center gap-3">
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{activeConv.name}</p>
                <p className="text-xs text-muted-foreground">Đang hoạt động</p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === "USER" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[65%] rounded-2xl px-4 py-2 text-sm ${
                        m.sender === "USER"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            <div className="p-3 border-t flex gap-2">
              <Input
                placeholder="Aa"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button size="icon" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
