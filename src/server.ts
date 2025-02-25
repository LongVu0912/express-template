import app from "./app";
import errorHandler from "errorhandler";

if (app.get("env") === "development") {
  app.use(errorHandler());
}

const server = app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"), "\n");
});

export default server;
