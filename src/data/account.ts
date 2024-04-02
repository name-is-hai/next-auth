import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import * as schema from "drizzle/schema";
export const getAccountByUserId = async (userId: string) => {
  try {
    drizzle.query.account.findFirst;
    const account = await drizzle.query.account.findFirst({
      where: eq(schema.account.userId, userId),
    });
    return account;
  } catch {
    return null;
  }
};
