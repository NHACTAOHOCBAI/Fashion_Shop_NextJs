interface Coupon {
  id: number;
  code: string;
  description: string;
  discountValue: number;
  minOrderAmount: number;
  usageLimit: number;
  usageLimitPerUser: number;
  createdAt: string;
  updatedAt: string;
}
