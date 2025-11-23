export enum OrderStatus {
  PENDING = "pending", // KH vừa đặt
  CONFIRMED = "confirmed", // Kho xác nhận
  SHIPPED = "shipped", // Đang giao
  DELIVERED = "delivered", // Đã giao thành công
  CANCELED = "canceled", // Đã hủy
}
