import {
  changePassword,
  getMyProfile,
  login,
  logoutService,
  register,
  updateMyProfile,
} from "@/services/auth.service";
import { logout, setCredentials } from "@/store/authSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      router.push("/login"); // hoặc "/auth/login" tùy route của bạn,
      toast.success("You has logout succesfully");
      dispatch(logout());
    },
  });
};
const useMyProfile = () =>
  useQuery({
    queryKey: ["getMyProfile"],
    queryFn: () => getMyProfile(),
  });
const useUpdateMyProfile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data }));
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
