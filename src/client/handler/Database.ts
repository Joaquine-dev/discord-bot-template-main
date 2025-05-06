import "reflect-metadata";
import { DataSource } from "typeorm";
import AppDataSource from "@utils/typeorm.config";
import { error, success } from "@utils/console";
export default class Database {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = AppDataSource;
  }

  async connect() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      success("🗄️ TypeORM connecté à PostgreSQL");
    }
  }

  async disconnect() {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      error("🛑 TypeORM déconnecté");
    }
  }

  getClient(): DataSource {
    return this.dataSource;
  }
}
