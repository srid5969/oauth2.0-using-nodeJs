import { acFilterAttributes } from "@leapjs/access-control";
import { Logger } from "@leapjs/common";
import { LeapApplication } from "@leapjs/core";
import { ExpressAdapter } from "@leapjs/router";
import { mongoose } from "@typegoose/typegoose";
import { json } from "express-mung";
import helmet from "helmet";
import "reflect-metadata";
import ErrorHandler from "./common/Handle-Error/error-handler";
import { configurations } from "./common/manager/config";
import { AccessTokenGeneratorForRefreshToken } from "./MiddleWare/OAuth/TokenGenerator/AccessTokenGenerator";
import { OTPController } from "./OTP/Controller/OTPController";
import { UserController } from "./User/Controller/UserController";

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
  corsOptions: {
    origin: "*",
    credentials: true,
  },
  beforeMiddlewares: [ helmet(), json(acFilterAttributes)],
  controllers: [UserController, AccessTokenGeneratorForRefreshToken,OTPController],
  afterMiddlewares: [ErrorHandler],
});

server.listen(port, () => {
  Logger.log(
    `⚡️[server]: Server is running at http://localhost:${port}`,
    "NODE Server"
  );
});
Logger.log(`Initializing settings`, "ConfigurationManager");
