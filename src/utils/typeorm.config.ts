import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Guilds } from "../entity/Guilds";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Guilds],
  migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
  synchronize: false,
  logging: false,
  logger: "advanced-console"
});
