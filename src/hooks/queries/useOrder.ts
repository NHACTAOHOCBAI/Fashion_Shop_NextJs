
import { getMyOrders, placeOrder } from '@/services/order.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useMyOrders = (params: QueryParams) =>
    useQuery({
        queryKey: ['my-orders', params],
        queryFn: () => getMyOrders(params),
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
export { useMyOrders, usePlaceOrder }