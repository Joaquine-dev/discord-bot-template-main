import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
import { parse } from "pg-connection-string";
import "reflect-metadata";
import { Guilds } from "../entity/Guilds";
import { Logs } from "../entity/Logs";
import { User } from "../entity/User";

dotenv.config();

let dbConfig: any;

if (process.env.DATABASE_URL) {
  const parsed = parse(process.env.DATABASE_URL);
  dbConfig = {
    type: "postgres",
    host: parsed.host,
    port: parseInt(parsed.port || "5432"),
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
  };
} else {
  dbConfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

export default new DataSource({
  ...dbConfig,
  entities: [Guilds,Logs , User],
  migrations: [path.join(__dirname, "..", "migrations", "*.{js,ts}")],
  synchronize: true,
  logging: true,
  logger: "advanced-console"
});
