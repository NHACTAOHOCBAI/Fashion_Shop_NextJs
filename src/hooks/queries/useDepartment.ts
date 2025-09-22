
import { createDepartment, deleteDepartment, deleteDepartments, getDepartments, getDepartmentSelection, updateDepartment } from '@/services/department.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useDepartments = (params: QueryParams) =>
    useQuery({
        queryKey: ['departments', params],
        queryFn: () => getDepartments(params),
    });
const useDepartmentSelections = () =>
    useQuery({
        queryKey: ['department-selection'],
        queryFn: () => getDepartmentSelection(),
    });
const useDeleteDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
    });
}
const useDeleteDepartments = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDepartments,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
    });
}
const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
    });
}
const useUpdateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
    });
}
export { useDepartments, useCreateDepartment, useDeleteDepartment, useDeleteDepartments, useUpdateDepartment, useDepartmentSelections }