import { z } from "zod";

const loginValidation = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

const registerUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export const AuthValidation = { loginValidation, registerUserValidation };
