import "reflect-metadata";
import { Logger } from "@leapjs/common";
import { AuthMiddleware } from "./MiddleWare/OAuth/Authentication/OAuth20";
import { acFilterAttributes } from "@leapjs/access-control";
import { LeapApplication } from "@leapjs/core";
import { ExpressAdapter } from "@leapjs/router";
import { json } from "express-mung";
import helmet from "helmet";
import ErrorHandler from "./common/Handle-Error/error-handler";
import { UserController } from "./User/Controller/UserController";
import { configurations } from "./common/manager/config";
import { mongoose } from "@typegoose/typegoose";
import { AccessTokenGeneratorForRefreshToken } from './MiddleWare/OAuth/TokenGenerator/AccessTokenGenerator';

const port = configurations.port;
const application: LeapApplication = new LeapApplication();
mongoose.connect(configurations.mongodbHostName || "", {
  dbName: configurations.dataBaseName || "",
});
const database = mongoose.connection;
database.on("error", (error) => console.error());
database.once("connected", () =>
  Logger.log(`Connected to the database`, "LeapApplication")
);

const server = application.create(new ExpressAdapter(), {
  // prefix: "v1",
  corsOptions: {
    origin: "http://localhost",
    credentials: true,
  },
  beforeMiddlewares: [AuthMiddleware, helmet(), json(acFilterAttributes)],
  controllers: [UserController,AccessTokenGeneratorForRefreshToken],
  afterMiddlewares: [ErrorHandler],
});

server.listen(port, () => {
  Logger.log(
    `⚡️[server]: Server is running at http://localhost:${port}`,
    "NODE Server"
  );
});
Logger.log(`Initializing settings`, "ConfigurationManager");
