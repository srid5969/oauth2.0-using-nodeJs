"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurations = void 0;
require("dotenv").config();
class Configuration {
    constructor() {
        this.dataBaseName = process.env.MONGODB_DATABASENAME;
        this.mongodbHostName = process.env.MONGODB_HOSTNAME;
        this.jwtSecret = process.env.jwtSecretKey;
        this.port = process.env.port;
    }
}
const configurations = new Configuration();
exports.configurations = configurations;
//# sourceMappingURL=config.js.map