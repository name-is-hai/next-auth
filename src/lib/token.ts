import { getPasswordRestTokenByEmail } from "@/data/password-rest-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);
  const exitsToken = await getTwoFactorTokenByEmail(email);
  if (exitsToken) {
    await db.twoFactorToken.delete({
      where: {
        id: exitsToken.id,
      },
    });
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);
  const exitsToken = await getPasswordRestTokenByEmail(email);
  if (exitsToken) {
    await db.passwordResetToken.delete({
      where: {
        id: exitsToken.id,
      },
    });
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3 * 60 * 1000);

  const exitsToken = await getVerificationTokenByEmail(email);
  if (exitsToken) {
    await db.verificationToken.delete({ where: { id: exitsToken.id } });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });
  return verificationToken;
};
