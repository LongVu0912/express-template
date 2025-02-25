import winston from "winston";

const options: winston.LoggerOptions = {
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      const meta = info[Symbol.for("splat")] ? JSON.stringify(info[Symbol.for("splat")]) : "";
      return `${info.timestamp} ${info.level}: ${info.message} ${meta}`;
    }),
  ),
  transports: [
    new winston.transports.Console({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
  ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
