import {
  changePassword,
  getMyProfile,
  login,
  logout,
  register,
  updateMyProfile,
} from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
    },
  });
};
const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login"); // hoặc "/auth/login" tùy route của bạn,
      toast.success("You has logout succesfully");
      localStorage.clear();
    },
  });
};
const useMyProfile = () =>
  useQuery({
    queryKey: ["getMyProfile"],
    queryFn: () => getMyProfile(),
  });
const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
    },
  });
};
export {
  useLogin,
  useMyProfile,
  useUpdateMyProfile,
  useLogout,
  useRegister,
  useChangePassword,
};
