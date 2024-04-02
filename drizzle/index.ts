import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import * as schema from "drizzle/schema";
import { createPool } from "mysql2/promise";

if (
  !process.env.DATABASE_USERNAME ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_HOST ||
  !process.env.DATABASE_PORT ||
  !process.env.DATABASE_NAME
)
  throw new Error("DB credentials missing.");

const poolConnection = createPool({
  user: String(process.env.DATABASE_USERNAME),
  password: process.env.DATABASE_PASSWORD,
  host: String(process.env.DATABASE_HOST),
  port: Number(process.env.DATABASE_PORT),
  database: String(process.env.DATABASE_NAME),
});
export const db: MySql2Database<typeof schema> = drizzle(poolConnection, {
  schema,
  mode: "default",
});
