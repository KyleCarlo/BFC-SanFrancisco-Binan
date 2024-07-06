import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";
import { DB } from "kysely-codegen";

const dialect = new MysqlDialect({
  pool: createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
});

const db = new Kysely<DB>({
  dialect,
});

export default db;
