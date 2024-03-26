import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter your email address!" }),
  password: z.string().min(1, { message: "Please enter your password!" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Please enter your email address!" }),
  password: z.string().min(6, { message: "Minimum 6 characters required!" }),
  name: z.string().min(1, { message: "Please enter your name!" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Please enter your email address!" }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters required!" }),
});
