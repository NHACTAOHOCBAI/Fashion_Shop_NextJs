"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LivestreamSocket } from "@/hooks/useLivestreamSocket";
import { useGetLivestreamMessages } from "@/hooks/queries/useLivestream";
import {
  LivestreamMessage,
  NewLiveMessageEvent,
  MessageDeletedEvent,
} from "@/interfaces/livestream";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, Pin, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Image from "next/image";

interface LiveChatPanelProps {
  livestreamId: number;
  isHost?: boolean;
  socket?: LivestreamSocket | null;
  isPreviewMode?: boolean; // New prop for preview mode
}

export const LiveChatPanel = ({ 
  livestreamId, 
  isHost = false, 
  socket = null,
  isPreviewMode = false 
}: LiveChatPanelProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<NewLiveMessageEvent[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data: initialMessages, isLoading } = useGetLivestreamMessages(
    livestreamId,
    50
  );

  // Load initial messages
  useEffect(() => {
    if (initialMessages) {
      console.log(`[LiveChat] 📥 Loaded ${initialMessages.length} initial messages`);
      const formatted = initialMessages.map((msg) => ({
        id: msg.id,
        userId: msg.user.id,
        user: {
          id: msg.user.id,
          fullName: msg.user.fullName,
          avatar: msg.user.avatar,
        },
        content: msg.content,
        isPinned: msg.isPinned,
        createdAt: msg.createdAt,
      }));
      setMessages(formatted);
      setIsInitialLoad(false); // Mark initial load complete
    }
  }, [initialMessages]);

  // Listen for new messages (skip in preview mode)
  useEffect(() => {
    if (isPreviewMode) {
      console.log("[LiveChat] 👁️ Preview mode - skipping socket listeners");
      return;
    }

    if (!socket || !livestreamId) {
      console.warn("[LiveChat] ⚠️ No socket or livestreamId available");
      return;
    }

    console.log("[LiveChat] 🔌 Setting up socket listeners for livestream:", livestreamId);
    console.log("[LiveChat] Socket connected:", socket.connected);
    console.log("[LiveChat] Socket ID:", socket.id);

    const handleJoinedLivestream = (data: any) => {
      console.log("[LiveChat] ✅ Successfully joined livestream room:", data);
    };

    const handleNewMessage = (data: NewLiveMessageEvent) => {
      console.log("[LiveChat] 📨 New message received:", data);
      setMessages((prev) => [...prev, data]);
    };

    const handleMessageDeleted = (data: MessageDeletedEvent) => {
      console.log("[LiveChat] 🗑️ Message deleted:", data.messageId);
      setMessages((prev) => prev.filter((msg) => msg.id !== data.messageId));
    };

    const handleMessagePinned = (data: { messageId: number; message: any }) => {
      console.log("[LiveChat] 📌 Message pinned:", data.messageId);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId ? { ...msg, isPinned: true } : msg
        )
      );
    };

    socket.on("joined_livestream", handleJoinedLivestream);
    socket.on("new_live_message", handleNewMessage);
    socket.on("message_deleted", handleMessageDeleted);
    socket.on("message_pinned", handleMessagePinned);

    return () => {
      console.log("[LiveChat] 🧹 Cleaning up socket listeners");
      socket.off("joined_livestream", handleJoinedLivestream);
      socket.off("new_live_message", handleNewMessage);
      socket.off("message_deleted", handleMessageDeleted);
      socket.off("message_pinned", handleMessagePinned);
    };
  }, [socket, livestreamId, isPreviewMode]);

  // Auto-scroll to bottom only for new messages (not initial load) and not in preview mode
  useEffect(() => {
    if (!isInitialLoad && !isPreviewMode && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isInitialLoad, isPreviewMode]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageInput.trim() || !user || !socket) {
      console.warn("[LiveChat] Cannot send message:", { 
        hasInput: !!messageInput.trim(), 
        hasUser: !!user, 
        hasSocket: !!socket,
        socketConnected: socket?.connected 
      });
      return;
    }

    console.log("[LiveChat] 📤 Sending message:", { 
      livestreamId, 
      content: messageInput.trim(),
      socketConnected: socket.connected 
    });

    socket.emit("send_live_message", {
      livestreamId,
      content: messageInput.trim(),
    });

    setMessageInput("");
  };

  const handleDeleteMessage = (messageId: number) => {
    if (!socket) return;
    socket.emit("delete_live_message", { messageId, livestreamId });
  };

  const handlePinMessage = (messageId: number) => {
    if (!socket) return;
    socket.emit("pin_live_message", { messageId, livestreamId });
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-xl">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-xl flex flex-col overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-blue-50">
        <h3 className="font-bold text-lg text-gray-800">
          Live Chat
          <span className="ml-2 text-sm font-normal text-gray-600">
            ({messages.length})
          </span>
        </h3>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <AnimatePresence initial={false}>
          {messages
            .slice()
            .sort((a, b) => {
              // Pinned messages first
              if (a.isPinned && !b.isPinned) return -1;
              if (!a.isPinned && b.isPinned) return 1;
              // Then by creation time (oldest first for normal, newest first within pinned)
              if (a.isPinned && b.isPinned) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              }
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            })
            .map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className={`group relative ${
                message.isPinned ? "bg-yellow-50 border border-yellow-200 rounded-lg p-2" : ""
              }`}
            >
              {/* Pinned badge */}
              {message.isPinned && (
                <div className="absolute -top-1 -left-1 bg-yellow-500 text-white rounded-full p-1">
                  <Pin className="w-3 h-3" />
                </div>
              )}

              <div className="flex items-start gap-2">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {message.user.avatar ? (
                    <Image
                      src={message.user.avatar}
                      alt={message.user.fullName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      {message.user.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Message content */}
                <div className="flex-1 min-w-0">
                  {/* User name and time */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-800">
                      {message.user.fullName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                        locale: enUS,
                      })}
                    </span>
                  </div>

                  {/* Message text */}
                  <p className="text-sm text-gray-700 break-words">
                    {message.content}
                  </p>
                </div>

                {/* Actions */}
                {(isHost || message.userId === user?.id) && (
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1">
                      {isHost && !message.isPinned && (
                        <button
                          onClick={() => handlePinMessage(message.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Pin Message"
                        >
                          <Pin className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input form - Hidden in preview mode */}
      {!isPreviewMode && user ? (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Enter your message..."
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 flex items-center justify-center transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {messageInput.length}/500 characters
          </p>
        </div>
      ) : !isPreviewMode && !user ? (
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            Please <a href="/login" className="text-cyan-600 hover:underline">log in</a> to chat
          </p>
        </div>
      ) : null}
    </div>
  );
};
