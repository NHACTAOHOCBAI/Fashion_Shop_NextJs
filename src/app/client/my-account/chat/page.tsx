"use client";

import ChatWindow from "@/components/chat/chatWindow";
import {
  useGetOrCreateConversation,
  useGetMessages,
} from "@/hooks/queries/useChat";
import { useMyProfile } from "@/hooks/queries/useAuth";
import { Loader2, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ClientChatPage() {
  // Get current user
  const { data: user, isLoading: userLoading } = useMyProfile();

  // Get or create conversation
  const {
    data: conversation,
    isLoading: conversationLoading,
    error: conversationError,
  } = useGetOrCreateConversation();

  // Get messages
  const { data: messages, isLoading: messagesLoading } = useGetMessages(
    conversation?.id || 0,
    !!conversation?.id
  );

  // Loading state
  if (userLoading || conversationLoading || messagesLoading) {
    return (
      <div className="h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading chat conversation...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (conversationError || !conversation || !user) {
    return (
      <div className="h-[calc(100vh-120px)] flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            Unable to load chat
          </h3>
          <p className="text-sm text-muted-foreground">
            {conversationError
              ? "Failed to load conversation. Please try again."
              : "Please make sure you are logged in."}
          </p>
        </Card>
      </div>
    );
  }

  // Get header info based on conversation state
  const headerUser = conversation.assignedAdmin
    ? {
        id: conversation.assignedAdmin.id,
        fullName: conversation.assignedAdmin.fullName,
        avatar: conversation.assignedAdmin.avatar,
      }
    : {
        id: 0,
        fullName: "Support Team",
        avatar: undefined,
      };

  return (
    <div className="h-[calc(100vh-120px)]">
      <ChatWindow
        conversationId={conversation.id}
        currentUserId={user.id}
        headerUser={headerUser}
        initialMessages={messages || []}
      />
    </div>
  );
}
