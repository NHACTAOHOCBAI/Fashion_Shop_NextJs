import z from "zod";

const UpdateBrandSchema = z.object({
    name: z.string("Brand name is required"),
    description: z.string().optional(),
    image: z.array(z.instanceof(File)).min(1, { message: "You must choose a image at least" })
})

export default UpdateBrandSchema