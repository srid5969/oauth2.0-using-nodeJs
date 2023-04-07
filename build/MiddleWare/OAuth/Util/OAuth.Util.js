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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthUtil = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const oauth2_server_1 = require("oauth2-server");
const uuid = __importStar(require("uuid"));
const model_1 = require("../Model/model");
const common_1 = require("@leapjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../common/manager/config");
const User_1 = require("../../../User/Model/User");
let OAuthUtil = class OAuthUtil {
    constructor() {
        this.accessTokenSecret = config_1.configurations.jwtSecret || "";
    }
    expiresIn() {
        var now = new Date();
        return new Date(now.setTime(now.getTime() + 1 * 120 * 1000));
    }
    getClient(clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield model_1.ClientModel.findOne({
                id: clientId,
                secret: clientSecret,
            });
            return data;
        });
    }
    saveToken(token, client, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                client: client,
                user: user,
                expires: this.expiresIn(),
            };
            const savetoken = new model_1.TokenModel(tokenData);
            const save = yield savetoken.save();
            const saved = yield save.populate({
                path: "user",
                select: "username",
            });
            return saved;
        });
    }
    getUser(username, plainPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!(username && plainPassword)) {
                    return reject(new oauth2_server_1.OAuthError("please enter username and password", {
                        name: "no_username_or_password",
                        code: 404,
                    }));
                }
                const data = yield User_1.UserModel.findOne({ username }, { password: 1 });
                if (data) {
                    const Data = yield bcrypt_1.default.compare(plainPassword, data.password);
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
            }));
        });
    }
    generateRefreshToken(client, user, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            let refreshTokens = yield uuid.v4();
            return refreshTokens;
        });
    }
    generateAccessToken(client, user, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, user), { client, scope }), this.accessTokenSecret, {
                expiresIn: "1h",
                algorithm: "HS256",
            });
        });
    }
    getAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = (yield jsonwebtoken_1.default.verify(accessToken, this.accessTokenSecret, { algorithms: ["HS256"] }));
                if (data) {
                    return new Promise(function (resolve, reject) {
                        return __awaiter(this, void 0, void 0, function* () {
                            let Data = yield model_1.TokenModel.findOne({
                                accessToken: accessToken,
                            });
                            Data.user = data;
                            Data.accessTokenExpiresAt = Data.expires;
                            return resolve(Data);
                        });
                    });
                }
            }
            catch (error) {
                throw new oauth2_server_1.InvalidTokenError("Token Cannot Be Found", {
                    code: 404,
                    name: "invalid JWT token",
                });
            }
        });
    }
    verifyScope(token, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Function verifyScope not implemented.");
        });
    }
    revokeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield model_1.TokenModel.findOneAndUpdate({ refreshToken: token.refreshToken }, { refreshTokenExpired: true });
            if (data) {
                return true;
            }
            throw new oauth2_server_1.InvalidTokenError("Access Token Expired");
        });
    }
    getRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield model_1.TokenModel.findOne({
                refreshToken: refreshToken,
                refreshTokenExpired: false,
            })
                .populate({ path: "user", select: "username" })
                .populate({ path: "client" });
            return data;
        });
    }
    validateScope(user, client, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            let read = "read";
            return Promise.resolve(read);
        });
    }
};
OAuthUtil = __decorate([
    (0, common_1.injectable)()
], OAuthUtil);
exports.OAuthUtil = OAuthUtil;
//# sourceMappingURL=OAuth.Util.js.map