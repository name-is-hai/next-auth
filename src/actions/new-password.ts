"use server";

import { getPasswordRestTokenByToken as getPasswordResetTokenByToken } from "@/data/password-rest-token";
import { getUserByEmail } from "@/data/user";
import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import { passwordResetToken, user, verificationToken } from "drizzle/schema";
import { NewPasswordSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await hash(password, 10);

  await drizzle
    .update(user)
    .set({
      password: hashedPassword,
    })
    .where(eq(user.id, existingUser.id));

  await drizzle.delete(passwordResetToken).where(eq(user.id, existingToken.id));

  return { success: "Password updated!" };
};
