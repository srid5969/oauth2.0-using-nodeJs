import {AuthMiddleware} from "./MiddleWare/OAuth/Authentication/OAuth20";

import "reflect-metadata";
import config from "./common/manager/config";

import { LeapApplication } from "@leapjs/core";
import { ExpressAdapter } from "@leapjs/router";
import { UserController } from "./user/Controller/UserController";
const port = 8081;
const application: LeapApplication = new LeapApplication();

application.connectToDatabase(config);
const server = application.create(new ExpressAdapter(), {
  // prefix: "v1",
  corsOptions: {
    origin: "http://localhost",
    credentials: true,
  },
  beforeMiddlewares: [AuthMiddleware],
  controllers: [UserController]
});
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
