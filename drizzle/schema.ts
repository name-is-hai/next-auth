import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  mysqlEnum,
  varchar,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

// Define user table
export const user = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: text("name"),
    email: varchar("email", { length: 455 }).unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    role: mysqlEnum("role", ["USER", "ADMIN"]).default("USER").notNull(),
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
  twoFactorConfirmation: one(twoFactorConfirmation, {
    fields: [user.id],
    references: [twoFactorConfirmation.userId],
    relationName: "twoFactorConfirmation",
  }),
  accounts: many(account),
}));

// Define account table
export const account = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
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
export const verificationToken = mysqlTable(
  "verificationToken",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(() => createId())
      .primaryKey(),
    email: varchar("email", { length: 455 }).notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
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
export const passwordResetToken = mysqlTable(
  "passwordResetToken",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(() => createId())
      .primaryKey(),
    email: varchar("email", { length: 455 }).notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
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
export const twoFactorToken = mysqlTable(
  "twoFactorToken",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(() => createId())
      .primaryKey(),
    email: varchar("email", { length: 455 }).notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
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
export const twoFactorConfirmation = mysqlTable(
  "twoFactorConfirmation",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(() => createId())
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).references(() => user.id, {
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
