"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import { user, verificationToken } from "drizzle/schema";
export const newVerification = async (token: string) => {
  const exitsToken = await getVerificationTokenByToken(token);
  if (!exitsToken) {
    return {
      error: "Invalid token!",
    };
  }

  const hasExpiresToken = new Date(exitsToken.expires) < new Date();
  if (hasExpiresToken) {
    return {
      error: "Token has expired!",
    };
  }

  const existUser = await getUserByEmail(exitsToken.email);
  if (!existUser) {
    return {
      error: "Email do not exist!",
    };
  }

  await drizzle
    .update(user)
    .set({
      emailVerified: new Date(),
      email: exitsToken.email,
    })
    .where(eq(user.id, existUser.id));

  await drizzle
    .delete(verificationToken)
    .where(eq(verificationToken.id, existUser.id));
  return { success: "Email verified" };
};
