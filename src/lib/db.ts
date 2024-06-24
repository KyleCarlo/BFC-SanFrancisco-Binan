import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";
import { DB } from "kysely-codegen";

const dialect = new MysqlDialect({
  pool: createPool(process.env.DATABASE_URL || ""),
});

const db = new Kysely<DB>({
  dialect,
});

export default db;
