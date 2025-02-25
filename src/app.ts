import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morganLogger from "morgan";
import logger from "./utils/logger";
import { appConfig, corsConfig } from "./config/config";
import { deserializeUser } from "./middleware";
import { errorHandler } from "./middleware/errorHandler";
import dbSync from "./database";
import appRouter from "./routes/v1";

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

app.use(deserializeUser);
app.use(bodyParser.json());

app.use("/api/v1", appRouter);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up.." });
  logger.info("Hello world");
});

app.patch("/api/sync", async (req, res) => {
  try {
    const sync = await dbSync();
    res.status(200).json({ ...sync, error: false });
  } catch (err) {
    console.log("ERR", err);
    let msg = "Internal Server Error";
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = err;
    }
    return res.status(400).json({ errorMsg: msg, error: true });
  }
});

app.use(errorHandler);
export default app;
