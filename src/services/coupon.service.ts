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

export interface CreateCouponPayload {
  code: string;
  name?: string;
  description?: string;

  discountType: DiscountType;
  discountValue?: number;

  minOrderAmount?: number;
  usageLimit?: number;
  usageLimitPerUser?: number;

  startDate: string; // ISO string
  endDate: string; // ISO string

  status?: CouponStatus;
  targets?: CouponTarget[];
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
const deleteCoupon = async ({ id }: { id: number }) => {
  const response = await axiosInstance.delete(`/coupons/${id}`);
  return response;
};
const deleteCoupons = async (ids: { ids: number[] }) => {
  const response = await axiosInstance.post("/coupons/remove-multiple", ids);
  return response;
};
const createCoupon = async (data: CreateCouponPayload) => {
  console.log("Create coupon payload:", data);

  const response = await axiosInstance.post("/coupons", {
    code: data.code,
    name: data.name,
    description: data.description,

    discountType: data.discountType,
    discountValue: data.discountValue,

    minOrderAmount: data.minOrderAmount,
    usageLimit: data.usageLimit,
    usageLimitPerUser: data.usageLimitPerUser,

    startDate: data.startDate,
    endDate: data.endDate,

    status: data.status,
    targets: data.targets,
  });

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
};
