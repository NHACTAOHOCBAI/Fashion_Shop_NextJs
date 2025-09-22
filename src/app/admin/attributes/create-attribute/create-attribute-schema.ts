import z from "zod";

const CreateAttributeSchema = z.object({
    name: z.string("Attribute name is required"),
})

export default CreateAttributeSchema