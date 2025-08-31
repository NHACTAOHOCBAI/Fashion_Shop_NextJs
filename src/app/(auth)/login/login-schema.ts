import z from "zod";

const LoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string("Password is required"),
})

export default LoginSchema