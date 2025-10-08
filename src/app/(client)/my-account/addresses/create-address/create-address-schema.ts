import { z } from "zod"

const CreateAddressSchema = z.object({
    detailAddress: z.string(),
    recipientName: z.string(),
    recipientPhone: z.string(),
    province: z.string(),
    district: z.string(),
    commune: z.string(),
    type: z.enum(["home", "office"]),
    isDefault: z.boolean(),
})

export default CreateAddressSchema