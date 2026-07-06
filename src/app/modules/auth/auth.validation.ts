import { z } from "zod";

const loginValidation = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const AuthValidation = { loginValidation };
