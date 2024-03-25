import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFileds = LoginSchema.safeParse(credentials);
        if (validatedFileds.success) {
          const { email, password } = validatedFileds.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const hashedPassword = await compare(password, user.password);
          if (hashedPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
