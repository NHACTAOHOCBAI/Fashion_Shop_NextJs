import z from "zod"

const VariantSchema = z.object({
    size: z.string().min(1, "Size is required"),
    color: z.string().min(1, "Color is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(1, "Price must be at least 1"),
    image: z.array(z.instanceof(File)).min(1, { message: "Variant must have at least one image" })
})

const CreateProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    price: z.number().min(1, "Price must be at least 1"),
    categoryId: z.number().min(1, "Category is required"),
    brandId: z.number().min(1, "Brand is required"),
    // 👇 sửa chỗ này: không để z.string() nữa
    variants: z.array(VariantSchema).min(1, "Must have at least one variant"),
    image: z.array(z.instanceof(File)).min(1, { message: "You must choose an image at least" })
})


export default CreateProductSchema
