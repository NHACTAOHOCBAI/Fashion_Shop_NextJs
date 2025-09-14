'use client'
import { createProduct, deleteProduct, deleteProducts, getProducts } from '@/services/product.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useProducts = (params: QueryParams) =>
    useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
    });
const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
const useDeleteProducts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProducts,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
export { useCreateProduct, useDeleteProducts, useDeleteProduct, useMutation, useProducts }