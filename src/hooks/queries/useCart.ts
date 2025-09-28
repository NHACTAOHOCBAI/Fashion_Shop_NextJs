
import { addToCart, getMyCart, removeFromCart } from '@/services/cart.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useGetMyCart = () =>
    useQuery({
        queryKey: ['cart'],
        queryFn: () => getMyCart(),
    });
const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}
const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}
export { useGetMyCart, useAddToCart, useRemoveFromCart }