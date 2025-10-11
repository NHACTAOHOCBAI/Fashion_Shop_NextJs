
import { getMyOrderById, getMyOrders, placeOrder } from '@/services/order.service';
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
export { useMyOrders, usePlaceOrder, useMyOrderById }