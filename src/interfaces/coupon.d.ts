interface Coupon {
  id: number;
  code: string;

  name: string | null;
  description: string | null;

  discountType: "percentage" | "fixed_amount" | "free_shipping";
  discountValue: number | null;

  minOrderAmount: string; // "0.00" → thường từ DECIMAL trong DB
  usageLimit: number;
  usageCount: number | null;
  usageLimitPerUser: number;

  startDate: string; // ISO string
  endDate: string; // ISO string

  status: "active" | "expired" | "disabled" | "scheduled";

  createdAt: string; // ISO string
  updatedAt: string; // ISO string;
}
