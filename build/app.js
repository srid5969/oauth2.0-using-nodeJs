"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@leapjs/common");
const OAuth20_1 = require("./MiddleWare/OAuth/Authentication/OAuth20");
const access_control_1 = require("@leapjs/access-control");
const core_1 = require("@leapjs/core");
const router_1 = require("@leapjs/router");
const express_mung_1 = require("express-mung");
const helmet_1 = __importDefault(require("helmet"));
const error_handler_1 = __importDefault(require("./common/Handle-Error/error-handler"));
const UserController_1 = require("./User/Controller/UserController");
const config_1 = require("./common/manager/config");
const typegoose_1 = require("@typegoose/typegoose");
const AccessTokenGenerator_1 = require("./MiddleWare/OAuth/TokenGenerator/AccessTokenGenerator");
const port = config_1.configurations.port;
const application = new core_1.LeapApplication();
typegoose_1.mongoose.connect(config_1.configurations.mongodbHostName || "", {
    dbName: config_1.configurations.dataBaseName || "",
});
const database = typegoose_1.mongoose.connection;
database.on("error", (error) => console.error());
database.once("connected", () => common_1.Logger.log(`Connected to the database`, "LeapApplication"));
const server = application.create(new router_1.ExpressAdapter(), {
    corsOptions: {
        origin: "http://localhost",
        credentials: true,
    },
    beforeMiddlewares: [OAuth20_1.AuthMiddleware, (0, helmet_1.default)(), (0, express_mung_1.json)(access_control_1.acFilterAttributes)],
    controllers: [UserController_1.UserController, AccessTokenGenerator_1.AccessTokenGeneratorForRefreshToken],
    afterMiddlewares: [error_handler_1.default],
});
server.listen(port, () => {
    common_1.Logger.log(`⚡️[server]: Server is running at http://localhost:${port}`, "NODE Server");
});
common_1.Logger.log(`Initializing settings`, "ConfigurationManager");
//# sourceMappingURL=app.js.map