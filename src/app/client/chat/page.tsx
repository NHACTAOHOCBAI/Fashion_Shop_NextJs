"use client";

import ChatWindow from "@/components/chat/chatWindow";
import axiosInstance from "@/config/axios";
import { useEffect, useState } from "react";

export default function ClientChatPage() {
  const [id, setId] = useState<number>();
  const [me, setMe] = useState<User | null>(null);
  useEffect(() => {
    axiosInstance.get("/auth/me").then((res) => {
      setMe(res.data);
    });
  }, []);
  useEffect(() => {
    axiosInstance.post("/chat/conversation").then((res) => {
      setId(res.data.id);
    });
  }, []);

  if (!id || !me) return null;

  return (
    <ChatWindow
      conversationId={id}
      currentUserId={me.id}
      headerUser={{
        id: 0,
        fullName: "Shop hỗ trợ",
      }}
    />
  );
}
