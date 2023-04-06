import { AuthMiddleware } from "./MiddleWare/OAuth/Authentication/OAuth20";
import { Logger } from "@leapjs/common";

import "reflect-metadata";
import config from "./common/manager/config";

import { LeapApplication } from "@leapjs/core";
import { ExpressAdapter } from "@leapjs/router";
import { UserController } from "./user/Controller/UserController";
import ErrorHandler from "./common/Handle-Error/error-handler";
import { json } from "express-mung";
import helmet from "helmet";
import { acFilterAttributes } from "@leapjs/access-control";

const port = 8081;
const application: LeapApplication = new LeapApplication();

application.connectToDatabase(config);

const server = application.create(new ExpressAdapter(), {
  // prefix: "v1",
  corsOptions: {
    origin: "http://localhost",
    credentials: true,
  },
  beforeMiddlewares: [AuthMiddleware, helmet(), json(acFilterAttributes)],
  controllers: [UserController],
  afterMiddlewares: [ErrorHandler],
});
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
Logger.log(`Initializing settings`, "ConfigurationManager");
Logger.log(`Connecting to the database`, "LeapApplication");
