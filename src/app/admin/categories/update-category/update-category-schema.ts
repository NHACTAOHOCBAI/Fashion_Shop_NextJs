import z from "zod";

const UpdateCategorySchema = z.object({
    name: z.string("Full name is required"),
    description: z.string().optional(),
    parentId: z.number().optional(),
    image: z.array(z.instanceof(File)).max(1).optional(),
})

export default UpdateCategorySchema