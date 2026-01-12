import axiosInstance from "@/config/axios";

export interface AskChatResponse {
  answer: string;
  products?: any[];
  recommendedProducts?: any[];
}

export interface ImageSearchResponse {
  answer: string;
  products: any[];
  imageUrl: string;
}

export interface VoiceSearchResponse {
  transcribed: string;
  answer: string;
  products: any[];
  audioUrl: string;
}

export const askChat = async (question: string) => {
  const response = (await axiosInstance.post("/chatbot/ask", {
    question,
  })) as { data: AskChatResponse };

  const data = response.data;
  if (data.recommendedProducts && !data.products) {
    data.products = data.recommendedProducts;
  }

  return data;
};

export const askChatWithImage = async (imageFile: File, message?: string) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  if (message) {
    formData.append("message", message);
  }

  const response = (await axiosInstance.post("/chatbot/ask/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })) as { data: ImageSearchResponse };

  return response.data;
};

export const askChatWithVoice = async (audioFile: File) => {
  const formData = new FormData();
  formData.append("audio", audioFile);

  const response = (await axiosInstance.post("/chatbot/ask/voice", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })) as { data: VoiceSearchResponse };

  return response.data;
};

export const getChatHistory = async () => {
  const response = (await axiosInstance.get("/chatbot/history")) as {
    data: BotMessage[];
  };

  const messages = response.data.map(msg => {
    // Backend stores products in different places depending on message type:
    // - Text chat: metadata.recommendedProducts
    // - Image/Voice search: metadata.products
    const rawProducts = 
      msg.products || 
      msg.recommendedProducts || 
      msg.metadata?.products ||           
      msg.metadata?.recommendedProducts || 
      [];
    
    // Normalize products: convert product_id to id for ProductInfo type
    const products: ProductInfo[] = rawProducts.map((product: any) => ({
      id: product.id || product.product_id,
      name: product.name || `Product ${product.product_id || product.id}`,
      price: product.price || 0,
      image_url: product.image_url || '',
      category: product.category || 'Unknown',
    }));
    
    return {
      ...msg,
      products
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
