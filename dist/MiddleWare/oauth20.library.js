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
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid = __importStar(require("uuid"));
const model_1 = require("./model");
const oauth2_server_1 = require("oauth2-server");
const user_1 = __importDefault(require("../user/model/user"));
const accessTokenSecret = process.env.jwtSecretKey || "dfghs3e";
var now = new Date();
now.setTime(now.getTime() + 1 * 60 * 1000);
let expiresIn = now;
exports.option = {
    getClient: async (clientId, clientSecret) => {
        const data = await model_1.ClientModel.findOne({
            id: clientId,
            secret: clientSecret,
        });
        return data;
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
    getUser: async (username, plainPassword) => {
        return new Promise(async (resolve, reject) => {
            if (!(username && plainPassword)) {
                new oauth2_server_1.OAuthError("please enter username and password", {
                    name: "no_username_or_password",
                    code: 404,
                });
                return reject({
                    message: "please enter username and password",
                });
            }
            const data = await user_1.default.findOne({ username }, { password: 1 });
            if (data) {
                /**
                 * TODO : Login
                 * !comparing
                 * @param password  plain text password
                 * @param data.password bcrypt password
                 */
                const Data = await bcrypt_1.default.compare(plainPassword, data.password);
                if (Data) {
                    let userData = { username, id: data._id };
                    return resolve(userData);
                }
                else {
                    reject({ message: "wrong password" });
                }
            }
            else {
                const err = new oauth2_server_1.AccessDeniedError("Bad Request", { code: 404 });
                reject(err);
            }
        });
    },
    generateRefreshToken: async (client, user, scope) => {
        let refreshTokens = await uuid.v4();
        return refreshTokens;
    },
    generateAccessToken: async (client, user, scope) => {
        return jsonwebtoken_1.default.sign({ ...user, client, scope }, accessTokenSecret, {
            expiresIn: "1h",
            algorithm: "HS256",
        });
    },
    getAccessToken: async function (accessToken) {
        try {
            let data = (await jsonwebtoken_1.default.verify(accessToken, accessTokenSecret, { algorithms: ["HS256"] }));
            if (data) {
                return new Promise(async function (resolve, reject) {
                    let Data = await model_1.TokenModel.findOne({
                        accessToken: accessToken,
                    });
                    Data.user = data;
                    Data.accessTokenExpiresAt = Data.expires;
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
    revokeToken: async (token) => {
        let data = await model_1.TokenModel.findOneAndUpdate({ refreshToken: token.refreshToken }, { refreshTokenExpired: true });
        console.log("==============================================", data);
        if (data) {
            return true;
        }
        throw new oauth2_server_1.InvalidTokenError("Access Token Expired");
    },
    getRefreshToken: async (refreshToken) => {
        let present = new Date();
        console.log(present);
        // refreshTokenExpired
        let data = await model_1.TokenModel.findOne({
            refreshToken: refreshToken,
            refreshTokenExpired: false,
        }).populate({ path: "client" });
        return data;
    },
    validateScope: async (user, client, scope) => {
        return "read";
    },
};
