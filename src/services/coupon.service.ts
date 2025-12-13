import axiosInstance from "@/config/axios";

const getCoupons = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/coupons/all", {
    params,
  })) as GetAllResponse<Coupon>;
  return response.data.data;
};
const getMyCoupons = async (params: QueryParams) => {
  const response = (await axiosInstance.get("/coupons/my", {
    params,
  })) as GetAllResponse<Coupon>;
  return response.data.data;
};
const deleteCoupon = async ({ id }: { id: number }) => {
  console.log(id);
  return {};
};
const deleteCoupons = async (ids: { ids: number[] }) => {
  console.log(ids);
  return {};
};
const createCoupon = async (data: {
  code: string;
  description?: string;
  discountValue: number;
  minOrderAmount: number;
  usageLimit: number;
  usageLimitPerUser: number;
}) => {
  console.log(data);
  const response = await axiosInstance.post("/coupons", data);
  return response;
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
