"use client";

import { useState, useEffect } from "react";
import ChatWindow from "@/components/chat/chatWindow";
import ConversationList from "@/components/chat/ConversationList";
import {
  useGetAllConversations,
  useGetMessages,
} from "@/hooks/queries/useChat";
import { useMyProfile } from "@/hooks/queries/useAuth";
import { Loader2, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { socket } from "@/lib/socket2";

export default function AdminChatPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  // Get current admin user
  const { data: user, isLoading: userLoading } = useMyProfile();

  // Get all conversations (admin only)
  const {
    data: conversations = [],
    isLoading: conversationsLoading,
    error: conversationsError,
  } = useGetAllConversations();

  // Get messages for selected conversation
  const { data: messages, isLoading: messagesLoading } = useGetMessages(
    selectedConversationId || 0,
    !!selectedConversationId
  );

  // Auto-select first conversation
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);

  // Listen for conversation updates
  useEffect(() => {
    const handleConversationUpdate = (payload: any) => {
      // Refresh conversations list when updates occur
      // This is handled automatically by React Query refetchInterval
    };

    socket.on("conversationUpdated", handleConversationUpdate);

    return () => {
      socket.off("conversationUpdated", handleConversationUpdate);
    };
  }, []);

  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
  };

  // Loading state
  if (userLoading || conversationsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading conversations...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (conversationsError || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Unable to load chats</h3>
          <p className="text-sm text-muted-foreground">
            {conversationsError
              ? "Failed to load conversations. Please try again."
              : "Please make sure you are logged in as an admin."}
          </p>
        </Card>
      </div>
    );
  }

  // Get selected conversation data
  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  return (
    <div className="flex h-screen bg-background border rounded-2xl overflow-hidden">
      {/* ===== SIDEBAR - Conversation List ===== */}
      <div className="w-[320px] bg-card border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Customer Support</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {conversations.length} conversation
            {conversations.length !== 1 ? "s" : ""}
          </p>
        </div>

        <ConversationList
          conversations={conversations}
          selectedId={selectedConversationId || undefined}
          onSelect={handleSelectConversation}
          currentUserId={user.id}
          isAdmin={true}
        />
      </div>

      {/* ===== CHAT WINDOW ===== */}
      <div className="flex-1 p-4">
        {selectedConversation && !messagesLoading ? (
          <ChatWindow
            conversationId={selectedConversation.id}
            currentUserId={user.id}
            headerUser={{
              id: selectedConversation.customer.id,
              fullName: selectedConversation.customer.fullName,
              avatar: selectedConversation.customer.avatar,
            }}
            initialMessages={messages || []}
          />
        ) : messagesLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">
                Select a conversation to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
