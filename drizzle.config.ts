import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  out: "./drizzle/metadata",
  schema: "./drizzle/schema.ts",
  driver: "pg",
  dbCredentials: { connectionString: String(process.env.DATABASE_URL) },
  verbose: true,
  strict: true,
} satisfies Config;
