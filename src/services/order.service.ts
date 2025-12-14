/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { AxiosResponse } from "axios";
export enum PaymentMethod {
  COD = "cod",
  PAYPAL = "paypal",
}
export enum ShippingMethod {
  STANDARD = "standard",
  EXPRESS = "express",
}
const placeOrder = async (data: {
  addressId: number;
  note?: string;
  items: { variantId: number; quantity: number }[];
  paymentMethod: string;
  shippingMethod: string;
  couponCode?: string;
}) => {
  const response = await axiosInstance.post("/orders", data);
  return response.data;
};
const getMyOrders = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/orders/me", {
    params,
  })) as GetAllResponse<Order>;
  return response.data;
};
const getMyOrderById = async (id: number) => {
  const response = (await axiosInstance.get(`/orders/me/${id}`)) as {
    data: Order;
  };
  return response.data;
};
const getOrders = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/orders/all", {
    params,
  })) as GetAllResponse<Order>;
  return response.data;
};
const updateOrder = async ({
  id,
  data,
}: {
  id: number;
  data: { status: string };
}) => {
  const response = await axiosInstance.patch(`/orders/${id}/status`, data);
  return response.data;
};
const cancelOrders = async (ids: { ids: number[] }) => {
  console.log("Cancel orders");
  return {} as Promise<AxiosResponse<any, any>>;
};
const cancelOrder = async (id: number) => {
  console.log("Cancel order");
};
export {
  placeOrder,
  getMyOrders,
  getMyOrderById,
  getOrders,
  updateOrder,
  cancelOrders,
  cancelOrder,
};
