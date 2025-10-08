import { createAddress, deleteAddress, getMyAddress, updateAddress } from '@/services/address.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useMyAddress = () =>
    useQuery({
        queryKey: ['my-address'],
        queryFn: () => getMyAddress(),
    });
const useDeleteAddress = () => {
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
const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-address'] });
        },
    });
}
export { useMyAddress, useCreateAddress, useDeleteAddress, useUpdateAddress }