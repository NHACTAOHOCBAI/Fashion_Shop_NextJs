import { deleteUser, getUsers } from "@/services/user.service";
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
export { useUsers, useDeleteUser }