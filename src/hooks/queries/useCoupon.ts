import {
  createCoupon,
  deleteCoupon,
  deleteCoupons,
  getCoupons,
  updateCoupon,
} from "@/services/coupon.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Lấy danh sách coupon (có thể truyền params lọc/pagination)
const useCoupons = (params: QueryParams) =>
  useQuery({
    queryKey: ["coupons", params],
    queryFn: () => getCoupons(params),
  });

// Tạo mới coupon
const useCreateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};

// Cập nhật coupon
const useUpdateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};

// Xoá một coupon
const useDeleteCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};

// Xoá nhiều coupon
const useDeleteCoupons = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCoupons,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};

export {
  useCoupons,
  useCreateCoupon,
  useUpdateCoupon,
  useDeleteCoupon,
  useDeleteCoupons,
};
