import axiosInstance from "@/config/axios";

export interface AskChatResponse {
  answer: string;
  products?: any[];
}

export const askChat = async (question: string) => {
  const response = (await axiosInstance.post("/chatbot/ask", {
    question,
  })) as { data: AskChatResponse };

  return response.data;
};

export const getChatHistory = async () => {
  const response = (await axiosInstance.get("/chatbot/history")) as {
    data: ChatMessage[];
  };

  return response.data;
};

export const clearChatHistory = async () => {
  const response = (await axiosInstance.delete("/chatbot/history")) as {
    data: { affected: number };
  };

  return response.data;
};
