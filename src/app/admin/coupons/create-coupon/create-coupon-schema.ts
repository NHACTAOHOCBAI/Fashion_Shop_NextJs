import z from "zod";

export const CreateCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  name: z.string().optional(),
  description: z.string().optional(),

  discountType: z.enum(["percentage", "fixed_amount", "free_shipping"]),
  discountValue: z.number().optional(),

  minOrderAmount: z.number().optional(),
  usageLimit: z.number().optional(),
  usageLimitPerUser: z.number().optional(),

  startDate: z.string(),
  endDate: z.string(),

  targets: z
    .array(
      z.object({
        targetType: z.enum(["product", "category", "all"]),
        targetId: z.number().optional(),
      })
    )
    .optional(),
});

export default CreateCouponSchema;
