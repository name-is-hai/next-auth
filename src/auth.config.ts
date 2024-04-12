import { LoginSchema } from "@/schemas";
import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/user";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
export default {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentials({
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
  trustHost: false,
} satisfies NextAuthConfig;
