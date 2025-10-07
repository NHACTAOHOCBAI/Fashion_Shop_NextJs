import z from "zod";

const UpdateProfileSchema = z.object({
    fullName: z.string("Full name is required"),
    avatar: z.array(z.instanceof(File)).max(1).optional(),
})

export default UpdateProfileSchema