import { user } from "drizzle/schema";
import { z } from "zod";
export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role: z.enum(user.role.enumValues),
    email: z.string().email().optional(),
    password: z
      .string()
      .min(6, { message: "Minimum 6 characters required!" })
      .optional(),
    newPassword: z
      .string()
      .min(6, { message: "Minimum 6 characters required!" })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password required",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password required",
      path: ["password"],
    },
  )
  .refine(
    (data) => {
      if (
        data.password &&
        data.newPassword &&
        data.password !== data.newPassword
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Password and New password cat not be the same",
      path: ["newPassword"],
    },
  );

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter your email address!" }),
  password: z.string().min(1, { message: "Please enter your password!" }),
  code: z.optional(z.string()),
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
