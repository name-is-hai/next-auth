import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing.");

const connectionPool = new Pool({
  connectionString: String(process.env.DATABASE_URL),
});

export const db: NodePgDatabase<typeof schema> = drizzle(connectionPool, {
  schema,
});
