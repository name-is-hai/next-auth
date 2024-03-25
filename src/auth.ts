import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   if (!user.id) return false;
    //   const exitUser = await getUserById(user.id);
    //   if (!exitUser || !exitUser.emailVerified) return false;

    //   return true;
    // },
    async session({ token, session }) {
      console.log({
        sessionToken: token,
        session,
      });
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const exitUser = await getUserById(token.sub);
      if (!exitUser) return token;
      token.role = exitUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
