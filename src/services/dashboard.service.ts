import axiosInstance from "@/config/axios";

/**
 * ================= DASHBOARD APIs =================
 * All APIs are used for Admin Dashboard (Fashion E-commerce)
 * Query param: range = '7d' | '30d' | 'month' | 'year'
 *
 * NOTE FOR BE TEAM:
 * - Responses should be lightweight (NO deep relations)
 * - Aggregations should be done in SQL, not FE
 */

/**
 * GET /admin/dashboard/overview
 * @param range
 * @returns {
 *   revenue: number;          // Tổng doanh thu
 *   totalOrders: number;      // Tổng số đơn hàng
 *   productsSold: number;     // Tổng số sản phẩm bán ra
 *   newCustomers: number;     // Khách hàng mới
 *   lowStockVariants: number; // Variant sắp hết hàng
 * }
 */
export const getDashboardOverview = async (range: string) => {
  const response = await axiosInstance.get("/admin/dashboard/overview", {
    params: { range },
  });
  return response;
};

/**
 * GET /admin/dashboard/revenue
 * @param range
 * @returns Array<{
 *   date: string;   // yyyy-mm-dd
 *   total: number;  // Doanh thu theo ngày
 * }>
 */
export const getDashboardRevenue = async (range: string) => {
  const response = await axiosInstance.get("/admin/dashboard/revenue", {
    params: { range },
  });
  return response;
};

/**
 * GET /admin/dashboard/order-status
 * @param range
 * @returns Array<{
 *   status: 'PENDING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
 *   count: number; // Số lượng đơn theo trạng thái
 * }>
 */
export const getDashboardOrderStatus = async (range: string) => {
  const response = await axiosInstance.get("/admin/dashboard/order-status", {
    params: { range },
  });
  return response;
};

/**
 * GET /admin/dashboard/top-products
 * @param range
 * @returns Array<{
 *   productId: number;
 *   name: string;
 *   sold: number;     // Số lượng bán
 *   revenue: number; // Doanh thu
 * }
 */
export const getDashboardTopProducts = async (range: string) => {
  const response = await axiosInstance.get("/admin/dashboard/top-products", {
    params: { range },
  });
  return response;
};

/**
 * GET /admin/orders/recent
 * @returns Array<{
 *   id: number;
 *   recipientName: string;
 *   recipientPhone: string;
 *   province: string;
 *   district: string;
 *   status: OrderStatus;
 *   totalAmount: number;
 *   createdAt: string;
 *   itemsCount: number; // BE nên trả sẵn để tránh join nặng
 * }>
 */
export const getRecentOrders = async () => {
  const response = await axiosInstance.get("/admin/orders/recent");
  return response;
};
