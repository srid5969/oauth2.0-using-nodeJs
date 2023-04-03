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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.OAuthUtil = void 0;
const oauth2_server_1 = require("oauth2-server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid = __importStar(require("uuid"));
const model_1 = require("../Model/model");
const user_1 = __importDefault(require("../../../user/Model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inversify_1 = require("inversify");
let expiresIn = () => {
    var now = new Date();
    return new Date(now.setTime(now.getTime() + 1 * 60 * 1000));
};
let OAuthUtil = class OAuthUtil {
    constructor() {
        this.accessTokenSecret = process.env.jwtSecretKey || "dfghs3e";
    }
    async getClient(clientId, clientSecret) {
        const data = await model_1.ClientModel.findOne({
            id: clientId,
            secret: clientSecret,
        });
        return data;
    }
    async saveToken(token, client, user) {
        const saveToken = new model_1.TokenModel({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            client: client,
            user: user,
            scope: token.scope,
            expires: expiresIn(),
        });
        return (await saveToken.save()).populate({
            path: "user",
            select: "username",
        });
    }
    async getUser(username, plainPassword) {
        return new Promise(async (resolve, reject) => {
            if (!(username && plainPassword)) {
                return reject(new oauth2_server_1.OAuthError("please enter username and password", {
                    name: "no_username_or_password",
                    code: 404,
                }));
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
                    let userData = { username, id: data._id, _id: data._id };
                    return resolve(userData);
                }
                else {
                    reject(new oauth2_server_1.OAuthError("wrong password", {
                        code: 401,
                        name: "invalid_password",
                    }));
                }
            }
            else {
                const err = new oauth2_server_1.AccessDeniedError("Bad Request", { code: 404 });
                reject(err);
            }
        });
    }
    async generateRefreshToken(client, user, scope) {
        let refreshTokens = await uuid.v4();
        return refreshTokens;
    }
    async generateAccessToken(client, user, scope) {
        return jsonwebtoken_1.default.sign({ ...user, client, scope }, this.accessTokenSecret, {
            expiresIn: "1h",
            algorithm: "HS256",
        });
    }
    async getAccessToken(accessToken) {
        try {
            let data = (await jsonwebtoken_1.default.verify(accessToken, this.accessTokenSecret, { algorithms: ["HS256"] }));
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
            throw new oauth2_server_1.InvalidTokenError("Token Cannot Be Found", {
                code: 404,
                name: "invalid JWT token",
            });
        }
    }
    async verifyScope(token, scope) {
        throw new Error("Function verifyScope not implemented.");
        // return false;
    }
    async revokeToken(token) {
        let data = await model_1.TokenModel.findOneAndUpdate({ refreshToken: token.refreshToken }, { refreshTokenExpired: true });
        if (data) {
            return true;
        }
        throw new oauth2_server_1.InvalidTokenError("Access Token Expired");
    }
    async getRefreshToken(refreshToken) {
        // refreshTokenExpired
        let data = await model_1.TokenModel.findOne({
            refreshToken: refreshToken,
            refreshTokenExpired: false,
        })
            .populate({ path: "user", select: "username" })
            .populate({ path: "client" });
        return data;
    }
    async validateScope(user, client, scope) {
        let read = "read";
        return Promise.resolve(read);
    }
};
OAuthUtil = __decorate([
    (0, inversify_1.injectable)()
], OAuthUtil);
exports.OAuthUtil = OAuthUtil;
