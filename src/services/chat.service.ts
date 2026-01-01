import axiosInstance from "@/config/axios";

// ============ Conversation Management ============

/**
 * Get or create conversation for current user
 * User-only endpoint
 */
export const getOrCreateConversation = async () => {
  const response = (await axiosInstance.post("/chat/conversation")) as {
    data: Conversation;
  };
  return response.data;
};

/**
 * Get all conversations (Admin only)
 * Returns list of all conversations with customer and assigned admin info
 */
export const getAllConversations = async () => {
  const response = (await axiosInstance.get("/chat/admin/conversations")) as {
    data: Conversation[];
  };
  return response.data;
};

// ============ Message Management ============

/**
 * Get messages for a specific conversation
 * @param conversationId - The conversation ID
 */
export const getMessages = async (conversationId: number) => {
  const response = (await axiosInstance.get(
    `/chat/conversations/${conversationId}/messages`
  )) as { data: ChatMessage[] };
  return response.data;
};

/**
 * Send a text-only message
 * @param dto - Message data with conversationId and content
 */
export const sendTextMessage = async (dto: SendMessageDto) => {
  const response = (await axiosInstance.post("/chat/send", dto)) as {
    data: ChatMessage;
  };
  return response.data;
};

/**
 * Send a message with attachments (images, voice, video)
 * @param dto - Message data with conversationId and optional content
 * @param files - Files to attach (images, voice, video)
 */
export const sendMessageWithFiles = async (
  dto: SendMessageDto,
  files: {
    images?: File[];
    voice?: File;
    video?: File;
  }
) => {
  const formData = new FormData();

  // Add conversationId
  formData.append("conversationId", dto.conversationId.toString());

  // Add content if exists
  if (dto.content && dto.content.trim()) {
    formData.append("content", dto.content);
  }

  // Add image files
  if (files.images && files.images.length > 0) {
    files.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  // Add voice file
  if (files.voice) {
    formData.append("voice", files.voice);
  }

  // Add video file
  if (files.video) {
    formData.append("video", files.video);
  }

  const response = (await axiosInstance.post("/chat/send", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })) as { data: ChatMessage };

  return response.data;
};

/**
 * Unified send message function
 * Automatically chooses text or multipart based on files
 * @param dto - Message data
 * @param files - Optional files to attach
 */
export const sendMessage = async (
  dto: SendMessageDto,
  files?: {
    images?: File[];
    voice?: File;
    video?: File;
  }
) => {
  // Check if there are any files
  const hasFiles =
    files &&
    ((files.images && files.images.length > 0) || files.voice || files.video);

  if (hasFiles) {
    return sendMessageWithFiles(dto, files);
  } else {
    return sendTextMessage(dto);
  }
};

// ============ Message Status ============

/**
 * Mark all messages in a conversation as seen
 * @param conversationId - The conversation ID
 */
export const markMessagesSeen = async (conversationId: number) => {
  await axiosInstance.post(`/chat/seen/${conversationId}`);
};
