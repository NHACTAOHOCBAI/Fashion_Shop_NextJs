import { login } from "@/services/auth.service";
import { useMutation } from '@tanstack/react-query';
const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
}
export { useLogin }