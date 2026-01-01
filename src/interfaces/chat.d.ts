// ============ Chatbot (AI) Interfaces ============
interface BotMessage {
  id?: number;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

// ============ User-Admin Chat Interfaces ============
type AttachmentType = "image" | "voice" | "video";

interface MessageAttachment {
  type: AttachmentType;
  url: string;
  publicId: string;
  fileName?: string;
  fileSize?: number;
  duration?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  format?: string;
}

interface ChatMessageSender {
  id: number;
  fullName: string;
  avatar?: string;
  role: "user" | "admin";
}

interface ChatMessage {
  id: number;
  conversationId: number;
  content: string | null;
  attachments: MessageAttachment[] | null;
  senderRole: "user" | "admin";
  sender: ChatMessageSender;
  isSeen: boolean;
  isDelivered: boolean;
  createdAt: string;
}

interface ConversationUser {
  id: number;
  fullName: string;
  avatar?: string;
  email?: string;
  role: "user" | "admin";
}

interface Conversation {
  id: number;
  customer: ConversationUser;
  assignedAdmin?: ConversationUser | null;
  status: "OPEN" | "HANDLING";
  createdAt: string;
  lastMessageAt: string;
}

interface ConversationWithLastMessage extends Conversation {
  lastMessage?: ChatMessage;
  unreadCount?: number;
}

// ============ DTO Interfaces ============
interface SendMessageDto {
  conversationId: number;
  content?: string;
}

interface SendMessageWithFilesDto extends SendMessageDto {
  images?: File[];
  voice?: File;
  video?: File;
}
