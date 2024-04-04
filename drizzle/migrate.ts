import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2/promise";

const main = async () => {
  const poolConnection = await createConnection({
    user: String(process.env.DATABASE_USERNAME),
    password: String(process.env.DATABASE_PASSWORD),
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    database: String(process.env.DATABASE_NAME),
  });
  const db: MySql2Database = drizzle(poolConnection);

  console.log("[migrating database] Running migrations ....");
  await migrate(db, { migrationsFolder: "drizzle/metadata" });

  console.log("[migrate] All migrations have ran, exiting ....");

  await poolConnection.end();
};

main();
