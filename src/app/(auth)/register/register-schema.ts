import z from "zod";

const RegisterSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string("Password is required"),
  fullName: z.string("Full name is required"),
});

export default RegisterSchema;
