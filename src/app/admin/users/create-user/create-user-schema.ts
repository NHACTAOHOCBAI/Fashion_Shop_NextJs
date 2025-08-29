import z from "zod";

const CreateUserSchema = z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    password: z.string().trim().min(1, "Password is required"),
    role: z.string().trim().min(1, "Role is required"),
})
export default CreateUserSchema