"use strict";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import  "reflect-metadata";
import morgan from "morgan";

import db from "./common/manager/config";
import { container } from "./common/iocConfig/config";
import { InversifyExpressServer } from "inversify-express-utils";
import { AuthMiddleware } from "./MiddleWare/OAuth/Authentication/OAuth20";

const port: number = 8080;
mongoose.connect(db);
/**
 * connecting  mongodb
 */
const database = mongoose.connection;
database.on("error", (error) => console.error());
database.once("connected", () => console.log("Database Connected"));

const app: Application = express();
/**
 * Added cors to resolve cors  @errors
 * @default 'GET,HEAD,PUT,PATCH,POST,DELETE'
 */
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
/**
 * Returns middleware that only parses json and only looks at requests
 * where the Content-Type header matches the type option.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
/**
 * Used OAuth 2.1 for authentication
 */

let server = new InversifyExpressServer(container, null, null, app);
/**
 * listing to the  @port 8000
 */
server
  .setConfig((app) => {
    var logger = morgan("combined");
    app.use(logger);
    app.use(container.resolve(AuthMiddleware).handler);
  })
  .build()
  .listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
