import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morganLogger from "morgan";
import logger from "./utils/logger";
import { appConfig, corsConfig } from "./config/config";

const app = express();

app.use(morganLogger("dev"));
app.set("port", appConfig.port);
app.set("env", appConfig.env);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: corsConfig.origin?.split(","),
    methods: corsConfig.methods?.split(","),
    allowedHeaders: corsConfig.allowedHeaders?.split(","),
    credentials: true,
  }),
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up.." });
  logger.info("Hello world");
});

export default app;
