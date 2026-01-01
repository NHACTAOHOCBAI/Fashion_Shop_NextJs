import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as chatService from "@/services/chat.service";

// ============ Query Keys ============
export const chatKeys = {
  all: ["chat"] as const,
  conversations: () => [...chatKeys.all, "conversations"] as const,
  conversation: () => [...chatKeys.all, "conversation"] as const,
  messages: (conversationId: number) =>
    [...chatKeys.all, "messages", conversationId] as const,
  adminConversations: () =>
    [...chatKeys.all, "admin", "conversations"] as const,
};

// ============ Conversation Queries ============

/**
 * Get or create conversation for current user
 * User-only hook
 */
export const useGetOrCreateConversation = () => {
  return useQuery({
    queryKey: chatKeys.conversation(),
    queryFn: chatService.getOrCreateConversation,
  });
};

/**
 * Get all conversations (Admin only)
 * Returns list of all conversations with customer and assigned admin info
 */
export const useGetAllConversations = () => {
  return useQuery({
    queryKey: chatKeys.adminConversations(),
    queryFn: chatService.getAllConversations,
    refetchInterval: 5000, // Auto-refresh every 5 seconds for admin
  });
};

// ============ Message Queries ============

/**
 * Get messages for a specific conversation
 * @param conversationId - The conversation ID
 * @param enabled - Whether to enable the query (default: true)
 */
export const useGetMessages = (conversationId: number, enabled = true) => {
  return useQuery({
    queryKey: chatKeys.messages(conversationId),
    queryFn: () => chatService.getMessages(conversationId),
    enabled: enabled && conversationId > 0,
  });
};

// ============ Message Mutations ============

/**
 * Send a message (text or with files)
 * Automatically invalidates messages query after success
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dto,
      files,
    }: {
      dto: SendMessageDto;
      files?: {
        images?: File[];
        voice?: File;
        video?: File;
      };
    }) => chatService.sendMessage(dto, files),
    onSuccess: (data) => {
      // Invalidate messages for this conversation
      queryClient.invalidateQueries({
        queryKey: chatKeys.messages(data.conversationId),
      });

      // Invalidate conversations lists
      queryClient.invalidateQueries({
        queryKey: chatKeys.conversations(),
      });

      queryClient.invalidateQueries({
        queryKey: chatKeys.adminConversations(),
      });
    },
  });
};

/**
 * Mark messages as seen
 * Automatically invalidates messages query after success
 */
export const useMarkMessagesSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: number) =>
      chatService.markMessagesSeen(conversationId),
    onSuccess: (_, conversationId) => {
      // Invalidate messages for this conversation
      queryClient.invalidateQueries({
        queryKey: chatKeys.messages(conversationId),
      });
    },
  });
};
