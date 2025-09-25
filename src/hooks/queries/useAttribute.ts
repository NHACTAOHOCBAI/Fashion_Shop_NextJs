
import { createAttribute, deleteAttribute, deleteAttributes, getAttributeCategoryByCategory, getAttributes, getAttributeSelection, updateAttribute } from '@/services/attribute.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useAttributes = (params: QueryParams) =>
    useQuery({
        queryKey: ['attributes', params],
        queryFn: () => getAttributes(params),
    });
const useAttributeSelections = () =>
    useQuery({
        queryKey: ['attribute-selection'],
        queryFn: () => getAttributeSelection(),
    });
const useDeleteAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAttribute,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attributes'] });
        },
    });
}
const useDeleteAttributes = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAttributes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attributes'] });
        },
    });
}
const useCreateAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAttribute,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attributes'] });
        },
    });
}
const useUpdateAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAttribute,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attributes'] });
        },
    });
}
const useGetAttributeCategoryByCategory = (id: number) =>
    useQuery({
        queryKey: ['attributes', id],
        queryFn: () => getAttributeCategoryByCategory(id),
    });
const useGetAttributeCategoryByCategorySlug = (id: number) =>
    useQuery({
        queryKey: ['attributes', id],
        queryFn: () => getAttributeCategoryByCategory(id),
    });
export { useAttributes, useCreateAttribute, useDeleteAttribute, useDeleteAttributes, useUpdateAttribute, useAttributeSelections, useGetAttributeCategoryByCategory }