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
const uuid = __importStar(require("uuid"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("./model");
let tokens; //mongodb
let users = [
    {
        id: "1",
        username: "thala",
        password: "sri",
    },
    {
        id: "2",
        username: "sri",
        password: "1234",
    },
];
const accessTokenSecret = "accessTokenSecret";
const refreshTokenSecret = "refreshTokenSecret";
// let secretKey = "secret_key";
let expiresIn = "1h";
exports.option = {
    //getClient BaseModel
    getClient: async (clientId, clientSecret) => {
        return { id: "1", grants: ["password"] };
    },
    //saveToken BaseModel
    saveToken: async (token, client, user) => {
        const _token = new model_1.TokenModel({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            clientId: token.client.id,
            userId: token.user.id,
            scope: token.scope,
            expires: "1h",
        });
        return await token.save();
    },
    //getUser BaseModel
    getUser: async (username, password) => {
        return new Promise(async (resolve, reject) => {
            let data = await model_1.TokenModel.findOne({ username }, { _id: 1, password: 1, username: 1 });
            if (!(username && password)) {
                reject({
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
                    // await generateToken(data._id)
                    //   .catch((err) => reject({message:err.toString()}))
                    //   .then((token) => resolve({ username:data.username,id:data._id,token }));
                }
                else {
                    reject({ message: "wrong password" });
                }
            }
            else {
                reject({ message: "user cannot be found" });
            }
        });
    },
    generateRefreshToken: async (client, user, scope) => {
        let refreshTokens; //=[refreshTokenSecret]
        const refreshToken = uuid.v4();
        refreshTokens.push(refreshToken);
        refreshTokens.push(client);
        refreshTokens.push(user);
        refreshTokens.push(scope);
        return refreshTokens;
    },
    validateScope: async (user, client, scope) => {
        return 0;
    },
    generateAccessToken: async (client, user, scope) => {
        return jsonwebtoken_1.default.sign({ ...user, client, scope }, accessTokenSecret, {
            expiresIn: "1h",
        });
    },
    getAccessToken: async function (accessToken) {
        let data = jsonwebtoken_1.default.verify(accessToken, accessTokenSecret);
        return new Promise(function (resolve, reject) {
            tokens.findOne({ access_token: accessToken }, function (err, token) {
                if (err)
                    reject(err);
                resolve({
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    client: { id: token.client.id, grants: ["password"] },
                    user: { id: token.user.id },
                });
            });
        });
        return {
            accessToken: "s",
            refreshToken: "s",
            demo: "",
            client: { id: "1", grants: ["password"] },
            user: { id: data.user.id },
        };
    },
    verifyScope: async function (token, scope) {
        throw new Error("Function not implemented.");
        return false;
    },
};
// const server = new OAuth2Server({
//   model: option,
//   allowBearerTokensInQueryString: true,
//   accessTokenLifetime: 4 * 60 * 60,
// });
// server;
