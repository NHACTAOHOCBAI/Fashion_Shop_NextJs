'use client'
import { createProduct, deleteProduct, deleteProducts, getProductById, getProducts } from '@/services/product.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useProducts = (params: ProductQueryParams) =>
    useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
    });
const useGetProductById = (id: number) =>
    useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
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
export { useCreateProduct, useDeleteProducts, useDeleteProduct, useMutation, useProducts, useGetProductById }