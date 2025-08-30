import { Role } from "@/constants/role.enum";
import z from "zod";

const CreateUserSchema = z.object({
    fullName: z.string("Full name is required"),
    email: z.email("Invalid email address"),
    password: z.string("Password is required"),
    role: z.enum(Role, "Invalid role"),
    avatar: z.array(z.instanceof(File)).max(1).optional(),
})

export default CreateUserSchema