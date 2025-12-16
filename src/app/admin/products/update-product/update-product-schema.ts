import z from "zod";

const updateProductSchemaFn = (
  attributes: {
    attributeName: string;
    values: { id: number; value: string }[];
  }[]
) => {
  const VariantSchema = z.object({
    quantity: z.number().min(1, "Quantity must be at least 1"),
    image: z.array(z.instanceof(File)).min(1, "Variant image is required"),

    attributes: z
      .array(
        z.object({
          attributeCategoryId: z.number().min(1),
          valueId: z.number().min(1),
        })
      )
      .superRefine((attrs, ctx) => {
        const selected = attrs.map((a) => a.valueId);
        for (const group of attributes) {
          const valid = group.values.some((v) => selected.includes(v.id));
          if (!valid) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Please select a value for "${group.attributeName}"`,
            });
          }
        }
      }),
  });

  return z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.number().min(1, "Price must be at least 1"),
    categoryId: z.number().min(1, "Category is required"),
    brandId: z.number().min(1, "Brand is required"),

    images: z
      .array(z.instanceof(File))
      .min(1, "At least one product image is required"),

    variants: z.array(VariantSchema).min(1, "At least one variant is required"),
  });
};

export default updateProductSchemaFn;
