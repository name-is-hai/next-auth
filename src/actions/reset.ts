"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const validatedFileds = ResetSchema.safeParse(value);
  if (!validatedFileds.success) {
    return { error: "Invalid email!" };
  }
  const { email } = validatedFileds.data;

  const existUser = await getUserByEmail(email);
  if (!existUser) {
    return { error: "User not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );
  return { success: "Reset email sent!" };
};
