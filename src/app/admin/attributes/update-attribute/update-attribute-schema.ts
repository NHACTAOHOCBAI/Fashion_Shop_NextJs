import z from "zod";

const UpdateAttributeSchema = z.object({
    name: z.string("Attribute name is required"),
})

export default UpdateAttributeSchema