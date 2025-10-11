interface Order {
    id: number;
    recipientName: string;
    recipientPhone: string;
    detailAddress: string;
    province: string;
    district: string;
    commune: string;
    status: string;
    totalAmount: number;
    note: string;
    user: User;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}
interface OrderItem {
    id: number;
    order: Order;
    variant: Variant;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
}