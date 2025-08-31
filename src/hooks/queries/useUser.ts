import { createUser, deleteUser, deleteUsers, getUsers, updateUser } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useUsers = (params: QueryParams) =>
    useQuery({
        queryKey: ['users', params],
        queryFn: () => getUsers(params),
    });
const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
const useDeleteUsers = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}
export { useUsers, useDeleteUser, useCreateUser, useUpdateUser, useDeleteUsers }