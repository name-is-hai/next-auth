"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/prisma";

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

  await prisma.user.update({
    where: { id: existUser.id },
    data: {
      emailVerified: new Date(),
      email: exitsToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: exitsToken.id },
  });
  return { success: "Email verified" };
};
