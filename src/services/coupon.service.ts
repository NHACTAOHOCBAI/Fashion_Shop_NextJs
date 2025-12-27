import axiosInstance from "@/config/axios";
// enums.ts
export enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

export enum CouponStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  DISABLED = "disabled",
  SCHEDULED = "scheduled",
}

export enum TargetType {
  PRODUCT = "product",
  CATEGORY = "category",
  ALL = "all",
}

// coupon.type.ts
export interface CouponTarget {
  targetType: TargetType;
  targetId?: number;
}

const getCoupons = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/coupons/all", {
    params,
  })) as GetAllResponse<Coupon>;
  return response.data;
};
const getMyCoupons = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/coupons/my", {
    params,
  })) as GetAllResponse<Coupon>;
  return response.data;
};
const getAvailable = async (data: {
  items: { variantId: number; quantity: number }[];
}) => {
  const response = (await axiosInstance.post(
    "/coupons/check-available",
    data
  )) as GetAllResponse<Coupon>;
  return response.data;
};
const deleteCoupon = async ({ id }: { id: number }) => {
  const response = await axiosInstance.delete(`/coupons/${id}`);
  return response;
};
const deleteCoupons = async (ids: { ids: number[] }) => {
  const response = await axiosInstance.post("/coupons/remove-multiple", ids);
  return response;
};

export interface CreateCouponPayload {
  code: string;
  name?: string;
  description?: string;

  discountType: string;
  discountValue?: number;

  minOrderAmount?: number;
  usageLimit?: number;
  usageLimitPerUser?: number;

  startDate: string;
  endDate: string;

  targets?: {
    targetType: string;
    targetId?: number;
  }[];
}

const createCoupon = async (data: CreateCouponPayload) => {
  console.log("Create coupon payload:", data);

  const payload = {
    ...data,
    discountValue:
      data.discountType === "free_shipping" ? undefined : data.discountValue,
  };

  const response = await axiosInstance.post("/coupons", payload);

  return response.data;
};

const updateCoupon = async ({
  id,
  data,
}: {
  id: number;
  data: {
    code: string;
    description: string;
    discountValue: number;
    minOrderAmount: number;
    usageLimit: number;
    usageLimitPerUser: number;
  };
}) => {
  const response = await axiosInstance.patch(`/coupons/${id}`, data);
  return response;
};
export {
  getCoupons,
  updateCoupon,
  createCoupon,
  deleteCoupons,
  deleteCoupon,
  getMyCoupons,
  getAvailable,
};
