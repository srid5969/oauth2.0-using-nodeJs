"use strict";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import reflectMetadata from "reflect-metadata";

import db from "./common/manager/config";
import oauth20 from "./MiddleWare/OAuth/Authentication/OAuth20";
import user from "./user/Router/user.router";
import {container} from "./common/iocConfig/config";



const port: number = 8000;
mongoose.connect(db);
const database = mongoose.connection;
database.on("error", (error) => console.error());
database.once("connected", () => console.log("Database Connected"));
const app: Express = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(oauth20);
app.use(user);

//
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
