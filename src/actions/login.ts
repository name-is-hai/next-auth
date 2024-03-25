"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validateField.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        case "AccessDenied":
          return { error: "AccessDenied!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
