
import { cancelOrder, cancelOrders, getMyOrderById, getMyOrders, getOrders, placeOrder, updateOrder } from '@/services/order.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useMyOrders = (params: QueryParams) =>
    useQuery({
        queryKey: ['my-orders', params],
        queryFn: () => getMyOrders(params),
    });
const useMyOrderById = (id: number) =>
    useQuery({
        queryKey: ['my-order'],
        queryFn: () => getMyOrderById(id),
    });
const usePlaceOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: placeOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-orders'] });
        },
    });
}
const useOrders = (params: QueryParams) =>
    useQuery({
        queryKey: ['orders', params],
        queryFn: () => getOrders(params),
    });
const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
const useDeleteOrders = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelOrders,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
export { useMyOrders, usePlaceOrder, useMyOrderById, useOrders, useUpdateOrder, useDeleteOrders, useDeleteOrder }