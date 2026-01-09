import axiosInstance from "@/config/axios";

export interface AskChatResponse {
  answer: string;
  products?: any[];
  recommendedProducts?: any[]; // Backend có thể trả về key này
}

export const askChat = async (question: string) => {
  const response = (await axiosInstance.post("/chatbot/ask", {
    question,
  })) as { data: AskChatResponse };

  // Map recommendedProducts -> products nếu cần
  const data = response.data;
  if (data.recommendedProducts && !data.products) {
    data.products = data.recommendedProducts;
  }

  return data;
};

export const getChatHistory = async () => {
  const response = (await axiosInstance.get("/chatbot/history")) as {
    data: BotMessage[];
  };

  // Map recommendedProducts -> products cho mỗi message
  const messages = response.data.map(msg => {
    // Xử lý các trường hợp backend có thể trả về
    const products = 
      msg.products || 
      msg.recommendedProducts || 
      msg.metadata?.recommendedProducts || 
      [];
    
    return {
      ...msg,
      products: products
    };
  });

  return messages;
};

export const clearChatHistory = async () => {
  const response = (await axiosInstance.delete("/chatbot/history")) as {
    data: { affected: number };
  };

  return response.data;
};
