"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: number;
  onSelect: (conversation: Conversation) => void;
  currentUserId: number;
  isAdmin?: boolean;
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  currentUserId,
  isAdmin = false,
}: ConversationListProps) {
  // Format last message time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 24) {
      return date.toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays < 7) {
      return date.toLocaleString("vi-VN", { weekday: "short" });
    } else {
      return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });
    }
  };

  // Get conversation display info based on role
  const getConversationInfo = (conversation: Conversation) => {
    if (isAdmin) {
      // Admin sees customer info
      return {
        name: conversation.customer.fullName,
        avatar: conversation.customer.avatar,
        email: conversation.customer.email,
      };
    } else {
      // User sees admin info (if assigned) or "Support Team"
      if (conversation.assignedAdmin) {
        return {
          name: conversation.assignedAdmin.fullName,
          avatar: conversation.assignedAdmin.avatar,
          email: conversation.assignedAdmin.email,
        };
      } else {
        return {
          name: "Support Team",
          avatar: undefined,
          email: undefined,
        };
      }
    }
  };

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <MessageCircle className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-sm">No conversations yet</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-2">
        {conversations.map((conversation) => {
          const info = getConversationInfo(conversation);
          const isSelected = selectedId === conversation.id;
          const isOpen = conversation.status === "OPEN";

          return (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left",
                isSelected
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-muted border border-transparent"
              )}
            >
              {/* Avatar */}
              <Avatar className="shrink-0">
                {info.avatar ? (
                  <img
                    src={info.avatar}
                    alt={info.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AvatarFallback>
                    {isAdmin ? (
                      <User className="h-4 w-4" />
                    ) : (
                      info.name.charAt(0)
                    )}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-medium text-sm truncate">{info.name}</p>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatTime(conversation.lastMessageAt)}
                  </span>
                </div>

                {isAdmin && info.email && (
                  <p className="text-xs text-muted-foreground truncate mb-1">
                    {info.email}
                  </p>
                )}

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <Badge
                    variant={isOpen ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {isOpen ? "Open" : "Handling"}
                  </Badge>

                  {isAdmin && conversation.assignedAdmin && (
                    <span className="text-xs text-muted-foreground truncate">
                      • {conversation.assignedAdmin.fullName}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
