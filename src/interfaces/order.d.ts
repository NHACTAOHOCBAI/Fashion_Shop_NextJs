export interface Order {
  id: number;
  recipientName: string;
  recipientPhone: string;
  detailAddress: string;
  province: string;
  district: string;
  commune: string;
  status: OrderStatus;
  totalAmount: number;
  note: string;
  user?: User;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  shippingMethod: string;
  paymentMethod?: string;
  paymentStatus?: string;
  shippingFee?: number;
  discountAmount?: number;
  couponCode?: string;
}
interface OrderItem {
  id: number;
  order: Order;
  variant: Variant;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  isReviewed: boolean;
}
