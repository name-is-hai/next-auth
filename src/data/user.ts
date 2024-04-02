import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import * as schema from "drizzle/schema";
export const getUserByEmail = async (email: string) => {
  try {
    const user = await drizzle.query.user.findFirst({
      where: eq(schema.user.email, email),
    });
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await drizzle.query.user.findFirst({
      where: eq(schema.user.id, id),
    });
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
