import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";

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
