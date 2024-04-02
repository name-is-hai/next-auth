import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import * as schema from "drizzle/schema";
export const getPasswordRestTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await drizzle.query.passwordResetToken.findFirst(
      {
        where: eq(schema.passwordResetToken.token, token),
      },
    );
    return passwordResetToken;
  } catch (error) {
    throw error;
  }
};
export const getPasswordRestTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await drizzle.query.passwordResetToken.findFirst(
      {
        where: eq(schema.passwordResetToken.email, email),
      },
    );
    return passwordResetToken;
  } catch (error) {
    throw error;
  }
};
