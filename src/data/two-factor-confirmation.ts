import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import * as schema from "drizzle/schema";
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await drizzle.query.twoFactorConfirmation.findFirst({
        where: eq(schema.twoFactorConfirmation.userId, userId),
      });
    return twoFactorConfirmation;
  } catch (err) {
    throw err;
  }
};
