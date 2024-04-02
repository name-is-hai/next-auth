import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import * as schema from "drizzle/schema";
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await drizzle.query.verificationToken.findFirst({
      where: eq(schema.verificationToken.token, token),
    });
    return verificationToken;
  } catch (error) {
    throw error;
  }
};
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await drizzle.query.verificationToken.findFirst({
      where: eq(schema.verificationToken.email, email),
    });
    return verificationToken;
  } catch (error) {
    throw error;
  }
};
