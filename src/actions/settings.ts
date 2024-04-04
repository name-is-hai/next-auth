"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { SettingsSchema } from "@/schemas";
import { compare, hash } from "bcryptjs";
import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import { user } from "drizzle/schema";
import { z } from "zod";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const current_user = await currentUser();

  if (!current_user?.id) return { error: "Unauthorized!" };
  const exitUser = await getUserById(current_user.id);
  if (!exitUser) return { error: "Unauthorized!" };

  if (current_user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== current_user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== current_user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };
  }
  if (values.password && values.newPassword && exitUser.password) {
    const passwordsMatch = await compare(values.password, exitUser.password);

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await drizzle
    .update(user)
    .set({
      ...values,
    })
    .where(eq(user.id, exitUser.id));
  return { success: "Settings Updated!" };
};
