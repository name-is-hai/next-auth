"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateField = RegisterSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name } = validateField.data;
  const hashedPassword = await hash(password, 10);

  const exitUser = await getUserByEmail(email);

  if (exitUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  // TODO: Send verification email notification

  return { success: "User Created!" };
};
