import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const main = async () => {
  // if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing.");
  const connectionPool = new Pool({
    connectionString: String(process.env.DATABASE_URL),
  });
  const db: NodePgDatabase = drizzle(connectionPool);

  console.log("[migrating database] Running migrations ....");
  await migrate(db, { migrationsFolder: "./drizzle/metadata" });

  console.log("[migrate] All migrations have ran, exiting ....");

  await connectionPool.end();
};
main();
