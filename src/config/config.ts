import dotenv from "dotenv";
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
