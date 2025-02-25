import dotenv from "dotenv";
import { Dialect } from "sequelize/types";
dotenv.config({ path: ".env" });

export const appConfig = {
  port: parseInt(process.env.PORT || "3000"),
  env: process.env.NODE_ENV || "development",
};

export const corsConfig = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS,
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
};

export const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  dialect: process.env.DB_TYPE as Dialect,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === "true",
  isCreateNewDB: process.env.CREATE_NEW_DB === "true",
};

export const jwtConfig = {
  secret: process.env.SECRET,
  expiry: process.env.TOKEN_EXPIRY_SECONDS,
  saltRound: 3,
};
