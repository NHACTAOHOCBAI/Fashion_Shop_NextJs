import { getMyProfile, login, logout, updateMyProfile } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
}
const useLogout = () => {
    return useMutation({
        mutationFn: logout,
    });
}
const useMyProfile = () =>
    useQuery({
        queryKey: ['getMyProfile'],
        queryFn: () => getMyProfile(),
    });
const useUpdateMyProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateMyProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getMyProfile'] });
        },
    });
}
export { useLogin, useMyProfile, useUpdateMyProfile, useLogout }