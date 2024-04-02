import { getPasswordRestTokenByEmail } from "@/data/password-rest-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import crypto from "crypto";
import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import {
  passwordResetToken,
  twoFactorToken,
  verificationToken,
} from "drizzle/schema";
import { v4 as uuidv4 } from "uuid";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);
  const exitsToken = await getTwoFactorTokenByEmail(email);
  if (exitsToken) {
    await drizzle
      .delete(twoFactorToken)
      .where(eq(twoFactorToken.id, exitsToken.id));
  }
  const factorToken = await drizzle.insert(twoFactorToken).values({
    email,
    token,
    expires,
  });
  if (factorToken[0].affectedRows === 0)
    throw new Error("Sorry, something went wrong!");
  return {
    email,
    token,
    expires,
  };
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);
  const exitsToken = await getPasswordRestTokenByEmail(email);
  if (exitsToken) {
    await drizzle
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.id, exitsToken.id));
  }
  const resetToken = await drizzle.insert(passwordResetToken).values({
    email,
    token,
    expires,
  });
  if (resetToken[0].affectedRows === 0)
    throw new Error("Sorry, something went wrong!");
  return {
    email,
    token,
    expires,
  };
};
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);

  const exitsToken = await getVerificationTokenByEmail(email);
  if (exitsToken) {
    await drizzle
      .delete(verificationToken)
      .where(eq(verificationToken.id, exitsToken.id));
  }
  const verifyToken = await drizzle.insert(verificationToken).values({
    token,
    email,
    expires,
  });
  if (verifyToken[0].affectedRows === 0)
    throw new Error("Sorry, something went wrong!");
  return {
    email,
    token,
    expires,
  };
};
