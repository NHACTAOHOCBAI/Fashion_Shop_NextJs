enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
  FREE_SHIPPING = "free_shipping",
}

enum CouponStatus {
  ACTIVE = "active",
  DISABLED = "disabled",
  SCHEDULED = "scheduled",
}
interface CouponTarget {
  id: number;
  targetType: "product" | "category" | "all";
  targetId?: number | null;
}
interface CouponRedemption {
  id: number;
  userId: number;
  couponId: number;
  usedAt: string; // ISO
}

interface Coupon {
  id: number;

  code: string;
  name?: string | null;
  description?: string | null;

  discountType: DiscountType;
  discountValue?: number | null;

  minOrderAmount: number;

  usageLimit: number;
  usageCount?: number | null;
  usageLimitPerUser: number;

  startDate: string; // ISO string
  endDate: string; // ISO string

  status: CouponStatus;

  createdAt: string; // ISO string
  updatedAt: string; // ISO string

  targets?: CouponTarget[];
  redemptions?: CouponRedemption[];
}
