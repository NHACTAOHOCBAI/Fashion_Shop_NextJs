import z from "zod";

const CreateCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  description: z.string().optional(),
  discountValue: z.number().min(1, "discount must be at least 1"),
  minOrderAmount: z.number().min(0, "Min order must be at least 0"),
  usageLimit: z.number().min(1, "Usage limit must be at least 1"),
  usageLimitPerUser: z
    .number()
    .min(1, "Usage limit per user must be at least 1"),
});

export default CreateCouponSchema;
