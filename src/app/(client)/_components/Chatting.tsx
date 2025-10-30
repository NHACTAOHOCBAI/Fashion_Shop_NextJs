"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { MessageCircle } from "lucide-react"; // icon từ lucide-react (được cài sẵn trong Next.js shadcn)

interface Message {
  id: number;
  sender: "customer" | "shop";
  text: string;
  time: string;
}

export default function ChatPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "shop",
      text: "Xin chào! Mình có thể giúp gì cho bạn hôm nay?",
      time: "09:00",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "customer",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Fake reply from shop
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "shop",
          text: "Shop: Cảm ơn bạn! Mình sẽ kiểm tra sản phẩm cho bạn ngay.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Nút bong bóng mở chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Hộp chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-indigo-600 text-white">
            <div className="font-semibold text-lg">Chat với Shop ABC</div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "customer" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    m.sender === "customer"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border"
                  }`}
                >
                  <p>{m.text}</p>
                  <div className="text-[10px] text-gray-400 mt-1 text-right">
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-gray-200 flex gap-3 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm"
            >
              Gửi
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
