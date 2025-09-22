import z from "zod";

const CreateDepartmentSchema = z.object({
    name: z.string("Department name is required"),
    description: z.string().optional(),
    image: z.array(z.instanceof(File)).min(1, { message: "You must choose a image at least" })
})

export default CreateDepartmentSchema