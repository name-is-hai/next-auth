import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getPasswordRestTokenByEmail } from "./password-rest-token";

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
