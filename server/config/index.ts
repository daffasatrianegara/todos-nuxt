import { Sequelize } from "sequelize";
import 'dotenv/config'

let dbName: string;
let dbUser: string;
let dbPassword: string;
let dbHost: string;
let dbPort: number;
let dbDialect: any;

if (process.env.NUXT_RUNTIME) {
  // Nuxt runtime context
  const config = useRuntimeConfig();
  dbName = config.dbName;
  dbUser = config.dbUser;
  dbPassword = config.dbPassword;
  dbHost = config.dbHost || "localhost";
  dbPort = Number(config.dbPort);
  dbDialect = config.dbDialect;
} else {
  // CLI or migrate.ts context
  dbName = process.env.DB_NAME || "";
  dbUser = process.env.DB_USER || "";
  dbPassword = process.env.DB_PASSWORD || "";
  dbHost = process.env.DB_HOST || "localhost";
  dbPort = Number(process.env.DB_PORT);
  dbDialect = process.env.DB_DIALECT;
}

export const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
});
