"use client";

import ChatWindow from "@/components/chat/chatWindow";
import axiosInstance from "@/config/axios";
import { useEffect, useState } from "react";

interface Conversation {
  id: number;
  customer: User;
  assignedAdmin: User;
  status: string;
  lastMessageAt: string;
  createdAt: string;
}

export default function AdminChatPage() {
  const [list, setList] = useState<Conversation[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    axiosInstance.get("/chat/admin/conversations").then((res) => {
      setList(res.data);
      if (res.data.length) {
        setActive(res.data[0].id);
      }
    });
  }, []);
  useEffect(() => {
    axiosInstance.get("/auth/me").then((res) => {
      setMe(res.data);
    });
  }, []);
  const activeConversation = list.find((c) => c.id === active);
  return (
    <div className="flex h-screen bg-gray-100 border rounded-2xl overflow-hidden">
      {/* ===== SIDEBAR ===== */}
      <div className="w-[320px] bg-white border-r flex flex-col">
        <div className="p-4 border-b font-semibold text-lg">Customers</div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {list.map((c) => {
            const isActive = c.id === active;
            const user = c.customer;

            return (
              <div
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                  ${isActive ? "bg-blue-50" : "hover:bg-gray-100"}`}
              >
                {/* Avatar */}
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {user.fullName.charAt(0)}
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{user.fullName}</p>
                    <span className="text-xs text-gray-400">
                      {c.lastMessageAt
                        ? new Date(c.lastMessageAt).toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : ""}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 truncate">
                    Press to view
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== CHAT WINDOW ===== */}
      <div className="flex-1 p-4">
        {active && me && activeConversation ? (
          <ChatWindow
            conversationId={activeConversation.id}
            currentUserId={me.id}
            headerUser={activeConversation.customer} // 👈 khách hàng
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No conversation
          </div>
        )}
      </div>
    </div>
  );
}
