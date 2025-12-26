import z from "zod";
const createProductSchemaFn = (
  attributes: {
    attributeName: string;
    values: {
      id: number;
      value: string;
    }[];
  }[]
) => {
  const VariantSchema = z.object({
    image: z
      .array(z.instanceof(File))
      .min(1, { message: "You must upload at least one image" }),
    attributes: z
      .array(
        z.object({
          attributeCategoryId: z.number().min(1, "Attribute is required"),
          valueId: z.number().min(1, "Value is required"),
        })
      )
      .superRefine((attrs, ctx) => {
        const selected = attrs.map((a) => a.attributeCategoryId);
        for (const group of attributes) {
          // Mỗi group (Color, Size, ...) phải có ít nhất 1 lựa chọn
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

  const CreateProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    price: z.number().min(1, "Price must be at least 1"),
    categoryId: z.number().min(1, "Category is required"),
    brandId: z.number().min(1, "Brand is required"),
    images: z
      .array(z.instanceof(File))
      .min(1, { message: "You must upload at least one image" }),
    variants: z.array(VariantSchema).min(1, "At least one variant is required"), // ✅ phải có ít nhất 1 variant
  });
  return CreateProductSchema;
};
export default createProductSchemaFn;
