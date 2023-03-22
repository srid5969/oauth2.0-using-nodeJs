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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const oauth2_server_1 = __importStar(require("oauth2-server"));
const oauth20_library_1 = require("./oauth20.library");
let model = oauth20_library_1.option;
function Oauth20Middleware(req, res, next) {
    if (req.originalUrl === "/user/login") {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            const request = new oauth2_server_1.Request(req);
            const response = new oauth2_server_1.Response(res);
            const server = new oauth2_server_1.default({
                model: model,
                accessTokenLifetime: 3600,
                allowExtendedTokenAttributes: true,
                //   debug: true
            });
            server.token(request, response).then((token) => {
                console.log(token);
                // The resource owner granted the access request.
            })
                .catch((err) => {
                console.log(err);
                // The request was invalid or not authorized.
            });
        }
        else {
            res.json({ message: "please enter username and password" });
        }
    }
    else {
        let token = req.headers.authorization || "";
        jsonwebtoken_1.default.verify(token, 'secretKey', { algorithms: ["HS256"] }, (err, decodedToken) => {
            if (err)
                throw err;
            console.log(decodedToken); // this is your decoded JWT with user details
        });
    }
}
exports.default = Oauth20Middleware;
