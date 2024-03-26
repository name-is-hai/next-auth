"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

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

  await db.user.update({
    where: { id: existUser.id },
    data: {
      emailVerified: new Date(),
      email: exitsToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: exitsToken.id },
  });
  return { success: "Email verified" };
};
