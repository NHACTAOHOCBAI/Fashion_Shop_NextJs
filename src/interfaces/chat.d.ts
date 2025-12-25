interface BotMessage {
  id?: number;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}
