import type { Config } from "drizzle-kit";

export default {
  out: "drizzle/metadata",
  schema: "drizzle/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    user: String(process.env.DATABASE_USERNAME),
    password: process.env.DATABASE_PASSWORD,
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    database: String(process.env.DATABASE_NAME),
  },
  verbose: true,
  strict: true,
} satisfies Config;
