import z from "zod";

const CreateCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),

  name: z.string().min(1, "Coupon name is required"),
  description: z.string().optional(),

  discountType: z.enum(["percentage", "fixed_amount", "free_shipping"]),
  discountValue: z.number().nullable(),

  minOrderAmount: z.number().min(0, "Min order must be at least 0"),
  usageLimit: z.number().min(1, "Usage limit must be at least 1"),
  usageLimitPerUser: z
    .number()
    .min(1, "Usage limit per user must be at least 1"),

  startDate: z.string(),
  endDate: z.string(),

  status: z.enum(["active", "disabled", "scheduled"]),
  targets: z.array(z.string()).optional(),
});

export default CreateCouponSchema;
