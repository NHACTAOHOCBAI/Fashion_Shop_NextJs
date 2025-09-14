import { createBrand, deleteBrand, deleteBrands, getBrands, getBrandSelection, updateBrand } from '@/services/brand.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useBrands = (params: QueryParams) =>
    useQuery({
        queryKey: ['brands', params],
        queryFn: () => getBrands(params),
    });
const useBrandSelections = () =>
    useQuery({
        queryKey: ['brand-selection'],
        queryFn: () => getBrandSelection(),
    });
const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
        },
    });
}
const useDeleteBrands = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBrands,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
        },
    });
}
const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
        },
    });
}
const useUpdateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
        },
    });
}
export { useBrands, useCreateBrand, useDeleteBrand, useDeleteBrands, useUpdateBrand, useBrandSelections }