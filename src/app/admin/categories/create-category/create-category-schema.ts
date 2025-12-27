import z from "zod";

const CreateCategorySchema = z.object({
  name: z.string("Category name is required"),
  description: z.string().optional(),
  image: z
    .array(z.instanceof(File))
    .min(1, { message: "You must choose a image at least" }),
  departmentId: z
    .string("Department is required")
    .min(1, "Department is required"),

  attributes: z
    .array(
      z.object({
        attributeId: z.number().min(1, { message: "Attribute is required" }),
        values: z
          .array(z.string().min(1, { message: "Value cannot be empty" }))
          .nonempty({ message: "At least one value is required" }),
      })
    )
    .optional(), // Cho phép category không có attribute nào
});

export default CreateCategorySchema;
