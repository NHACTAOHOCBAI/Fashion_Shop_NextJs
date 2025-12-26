import {
  cancelOrder,
  cancelOrderByAdmin,
  confirmDelivery,
  getMyOrderById,
  getMyOrders,
  getOrders,
  placeOrder,
  updateOrder,
} from "@/services/order.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useMyOrders = (params: OrderQueryParams) =>
  useQuery({
    queryKey: ["my-orders", params],
    queryFn: () => getMyOrders(params),
    placeholderData: (previousData) => previousData,
  });
// const useMyOrderById = (id: number) =>
//   useQuery({
//     queryKey: ["my-order"],
//     queryFn: () => getMyOrderById(id),
//   });
const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};
const useOrders = (params: OrderQueryParams) =>
  useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
  });
const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
const useDeleteOrderByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrderByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};
const useConfirmOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};
export {
  useMyOrders,
  usePlaceOrder,
  useOrders,
  useUpdateOrder,
  useDeleteOrder,
  useConfirmOrder,
  useDeleteOrderByAdmin,
};
