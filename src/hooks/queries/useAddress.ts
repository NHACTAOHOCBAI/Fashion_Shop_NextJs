import { createAddress, deleteAddress, getMyAddress } from '@/services/address.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useMyAddress = () =>
    useQuery({
        queryKey: ['my-address'],
        queryFn: () => getMyAddress(),
    });
const useDeleteAdress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-address'] });
        },
    });
}
const useCreateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-address'] });
        },
    });
}
export { useMyAddress, useCreateAddress, useDeleteAdress }