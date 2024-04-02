import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import * as schema from "drizzle/schema";
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await drizzle.query.twoFactorToken.findFirst({
      where: eq(schema.twoFactorToken.token, token),
    });
    return twoFactorToken;
  } catch (error) {
    throw error;
  }
};
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await drizzle.query.twoFactorToken.findFirst({
      where: eq(schema.twoFactorToken.email, email),
    });
    return twoFactorToken;
  } catch (error) {
    throw error;
  }
};
