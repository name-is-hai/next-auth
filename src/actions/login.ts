"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import {
  twoFactorConfirmation,
  twoFactorToken
} from "drizzle/schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validateField.data;

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

  if (exitUser.isTwoFactorEnabled && exitUser.email) {
    if (code) {
      const factorToken = await getTwoFactorTokenByEmail(exitUser.email);
      if (!factorToken || factorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(factorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired!" };
      }
      await drizzle
        .delete(twoFactorToken)
        .where(eq(twoFactorToken.id, factorToken.id));

      const existConfirmation = await getTwoFactorConfirmationByUserId(
        exitUser.id,
      );
      if (existConfirmation) {
        await drizzle
          .delete(twoFactorConfirmation)
          .where(eq(twoFactorConfirmation.id, existConfirmation.id));
      }

      await drizzle.insert(twoFactorConfirmation).values({
        userId: exitUser.id,
      });
    } else {
      const twoFactToken = await generateTwoFactorToken(exitUser.email);
      await sendTwoFactorEmail(twoFactToken.email, twoFactToken.token);
      return { twoFactor: true };
    }
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
