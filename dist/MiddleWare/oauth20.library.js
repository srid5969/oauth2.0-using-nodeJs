"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid = __importStar(require("uuid"));
const model_1 = require("./model");
const oauth2_server_1 = require("oauth2-server");
const accessTokenSecret = process.env.jwtSecretKey || "dfghs3e";
var now = new Date();
now.setTime(now.getTime() + 1 * 3600 * 1000);
let expiresIn = now;
exports.option = {
    getClient: async (clientId, clientSecret) => {
        return { id: "1", grants: ["password"] };
    },
    saveToken: async (token, client, user) => {
        const _token = new model_1.TokenModel({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            client: client,
            user: user,
            scope: token.scope,
            expires: expiresIn,
        });
        return await _token.save();
    },
    getUser: async (username, password) => {
        return new Promise(async (resolve, reject) => {
            let data = await model_1.TokenModel.findOne({ username }, { _id: 1, password: 1, username: 1 });
            if (!(username && password)) {
                new oauth2_server_1.OAuthError('please enter username and password', { name: 'no_username_or_password', code: 404 });
                return reject({
                    message: "please enter username and password",
                });
                return;
            }
            //if  data
            if (data) {
                /**
                 * TODO : Login
                 * !comparing
                 * @param password  plain text password
                 * @param data.password bcrypt password
                 */
                const Data = await bcryptjs_1.default.compare(password, data.password);
                if (Data) {
                    return resolve(Data);
                }
                else {
                    reject({ message: "wrong password" });
                }
            }
            else {
                // reject({ message: "user cannot be found" });
                resolve({
                    id: "1",
                    username: "thala",
                    password: "sri",
                    scope: ["write"],
                });
            }
        });
    },
    generateRefreshToken: async (client, user, scope) => {
        let refreshTokens = await uuid.v4();
        return refreshTokens;
    },
    validateScope: async (user, client, scope) => {
        return "read";
    },
    generateAccessToken: async (client, user, scope) => {
        return jsonwebtoken_1.default.sign({ ...user, client, scope }, accessTokenSecret, {
            expiresIn: "1h",
            algorithm: "HS256"
        });
    },
    getAccessToken: async function (accessToken) {
        console.log("===================================");
        try {
            let data = (await jsonwebtoken_1.default.verify(accessToken, accessTokenSecret, { algorithms: ['HS256'] }));
            if (data) {
                return new Promise(async function (resolve, reject) {
                    let Data = await model_1.TokenModel.findOne({
                        accessToken: accessToken,
                    });
                    Data.accessTokenExpiresAt = Data.expires;
                    console.log(Data);
                    return resolve(Data);
                });
            }
        }
        catch (error) {
            return error;
        }
    },
    verifyScope: async function (token, scope) {
        throw new Error("Function verifyScope not implemented.");
        return false;
    },
};
