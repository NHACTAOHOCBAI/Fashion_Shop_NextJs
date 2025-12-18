import { useQuery } from "@tanstack/react-query";
import {
  getDashboardOverview,
  getDashboardRevenue,
  getDashboardOrderStatus,
  getDashboardTopProducts,
  getRecentOrders,
} from "@/services/dashboard.service";

/* OVERVIEW */
export const useDashboardOverview = (range: string) =>
  useQuery({
    queryKey: ["dashboard-overview", range],
    queryFn: async () => {
      const res = await getDashboardOverview(range);
      return res.data;
    },
  });

/* REVENUE */
export const useDashboardRevenue = (range: string) =>
  useQuery({
    queryKey: ["dashboard-revenue", range],
    queryFn: async () => {
      const res = await getDashboardRevenue(range);
      return res.data;
    },
  });

/* ORDER STATUS */
export const useDashboardOrderStatus = (range: string) =>
  useQuery({
    queryKey: ["dashboard-order-status", range],
    queryFn: async () => {
      const res = await getDashboardOrderStatus(range);
      return res.data;
    },
  });

/* TOP PRODUCTS */
export const useDashboardTopProducts = (range: string) =>
  useQuery({
    queryKey: ["dashboard-top-products", range],
    queryFn: async () => {
      const res = await getDashboardTopProducts(range);
      return res.data;
    },
  });

/* RECENT ORDERS */
export const useRecentOrders = () =>
  useQuery({
    queryKey: ["dashboard-recent-orders"],
    queryFn: async () => {
      const res = await getRecentOrders();
      return res.data;
    },
  });
