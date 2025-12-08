interface Address {
  id: number;
  detailAddress: string;
  recipientName: string;
  recipientPhone: string;
  detailAddress: string;
  province: string;
  district: string;
  commune: string;
  type: "home" | "office";
  isDefault: boolean;
  userId: number;
}
