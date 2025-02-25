import { appConfig, dbConfig } from "../config/config";
import logger from "../utils/logger";
import { Sequelize } from "sequelize-typescript";

const isDev = appConfig.env === "development";
const isCreateNewDB = dbConfig.isCreateNewDB;

const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: dbConfig.ssl,
  },
  models: [__dirname + "/models"],
  logging: (msg) => logger.debug(msg),
});

const dbSync = async () => {
  await sequelize.authenticate();

  await sequelize.sync({ alter: isDev, force: isCreateNewDB });

  return { success: true };
};

dbSync()
  .then((res) => {
    logger.info(`DB sync with status: ${res.success}`);
  })
  .catch((err) => {
    logger.error("Failed to sync DB", err);
  });

export default dbSync;
