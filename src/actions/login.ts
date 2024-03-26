"use server";

import { signIn } from "@/auth";
import { generateVerificationToken } from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
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

  const exitUser = await getUserByEmail(email);
  if (!exitUser || !exitUser.email || !exitUser.password) {
    return { error: "Email is not exist!" };
  }

  if (!exitUser.emailVerified) {
    const verificationToken = await generateVerificationToken(exitUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return { success: "Confirmation email sent!" };
  }

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
