interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  time: string;
  createdAt: Date;
  type: "ORDER" | "DISCOUNT";
}
