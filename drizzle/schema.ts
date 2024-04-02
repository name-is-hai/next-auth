import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// Define user table
export const user = pgTable(
  "User",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    role: text("role", { enum: ["USER", "ADMIN"] })
      .default("USER")
      .notNull(),
    isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("User_email_key").on(table.email),
    };
  },
);

// Define relationship for user table
export const userRelationship = relations(user, ({ one, many }) => ({
  // Error might be here, ensure correct reference to twoFactorConfirmation table
  twoFactorConfirmation: one(twoFactorConfirmation, {
    fields: [user.id],
    references: [twoFactorConfirmation.userId],
    relationName: "twoFactorConfirmation",
  }),
  accounts: many(account),
}));

// Define account table
export const account = pgTable(
  "Account",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => {
    return {
      providerProviderAccountIdKey: uniqueIndex(
        "Account_provider_providerAccountId_key",
      ).on(table.provider, table.providerAccountId),
    };
  },
);

// Define relationship for account table
export const accountRelationship = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// Define verificationToken table
export const verificationToken = pgTable(
  "VerificationToken",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
      emailTokenKey: uniqueIndex("VerificationToken_email_token_key").on(
        table.email,
        table.token,
      ),
    };
  },
);

// Define passwordResetToken table
export const passwordResetToken = pgTable(
  "PasswordResetToken",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("PasswordResetToken_token_key").on(table.token),
      emailTokenKey: uniqueIndex("PasswordResetToken_email_token_key").on(
        table.email,
        table.token,
      ),
    };
  },
);

// Define twoFactorToken table
export const twoFactorToken = pgTable(
  "TwoFactorToken",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      tokenKey: uniqueIndex("TwoFactorToken_token_key").on(table.token),
      emailTokenKey: uniqueIndex("TwoFactorToken_email_token_key").on(
        table.email,
        table.token,
      ),
    };
  },
);

// Define twoFactorConfirmation table
export const twoFactorConfirmation = pgTable(
  "TwoFactorConfirmation",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("userId").references(() => user.id, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex("TwoFactorConfirmation_userId_key").on(
        table.userId,
      ),
    };
  },
);
