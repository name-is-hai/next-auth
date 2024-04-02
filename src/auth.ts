import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";

import authConfig from "@/auth.config";
import { getAccountByUserId } from "@/data/account";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getUserById } from "@/data/user";
import { db as drizzle } from "drizzle";
import { eq } from "drizzle-orm";
import { twoFactorConfirmation, user } from "drizzle/schema";

type UserRole = (typeof user.role.enumValues)[number];

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user: users }) {
      if (users?.id)
        await drizzle
          .update(user)
          .set({ emailVerified: new Date() })
          .where(eq(user.id, users.id));
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const factorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!factorConfirmation) return false;

        await drizzle
          .delete(twoFactorConfirmation)
          .where(eq(twoFactorConfirmation.id, factorConfirmation.id));
      }

      return true;
    },
    async session({ token, session }) {
      console.log({
        sessionToken: token,
        session,
      });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const exitUser = await getUserById(token.sub);
      if (!exitUser) return token;
      const existingAccount = await getAccountByUserId(exitUser.id);

      token.isOAuth = !!existingAccount;
      token.role = exitUser.role;
      token.name = exitUser.name;
      token.isTwoFactorEnabled = exitUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: DrizzleAdapter(drizzle),
  session: { strategy: "jwt" },
  ...authConfig,
});
