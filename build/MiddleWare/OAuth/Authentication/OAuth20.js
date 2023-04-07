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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const router_1 = require("@leapjs/router");
const oauth2_server_1 = __importStar(require("oauth2-server"));
const common_1 = require("@leapjs/common");
require("reflect-metadata");
const OAuth_Util_1 = require("../Util/OAuth.Util");
let AuthMiddleware = class AuthMiddleware {
    constructor(option) {
        this.option = option;
    }
    before(req, res, next) {
        let request = new oauth2_server_1.Request(req);
        const response = new oauth2_server_1.Response(res);
        request.headers["content-type"] = "application/x-www-form-urlencoded";
        const server = new oauth2_server_1.default({
            model: this.option,
            accessTokenLifetime: 60,
            allowExtendedTokenAttributes: true,
        });
        switch (req.originalUrl) {
            case "/user/signup":
                next();
                break;
            case "/token/auth":
                server
                    .token(request, response)
                    .then((token) => {
                    res.send({
                        refreshToken: token.refreshToken,
                        accessToken: token.accessToken,
                    });
                })
                    .catch((err) => {
                    err.statusCode
                        ? res.status(err.statusCode).json(err)
                        : res.send(err).status(400);
                });
                break;
            case "/user/login":
                let username = req.body.username;
                let password = req.body.password;
                if (username && password) {
                    server
                        .token(request, response)
                        .then((token) => {
                        res.json({
                            accessToken: token.accessToken,
                            refreshToken: token.refreshToken,
                            user: token.user,
                        });
                    })
                        .catch((err) => {
                        err.statusCode
                            ? res.status(err.statusCode).json(err)
                            : res.send(err).status(400);
                    });
                }
                else {
                    res.json({ message: "please enter username and password" });
                }
                break;
            default:
                if (!req.headers.authorization) {
                    res.status(404).json({ message: "Token Not Found" });
                    break;
                }
                let token = req.headers.authorization.split(" ") || "";
                if (token[1]) {
                    server
                        .authenticate(request, response)
                        .then((token) => {
                        next();
                    })
                        .catch((err) => {
                        console.error(err);
                        err.statusCode
                            ? res.status(err.statusCode).json(err)
                            : res.send(err).status(400);
                    });
                }
                else {
                    res.status(404).json({ message: "Bearer Token Not Found" });
                }
                break;
        }
    }
};
AuthMiddleware = __decorate([
    (0, router_1.Middleware)(),
    __param(0, (0, common_1.inject)(OAuth_Util_1.OAuthUtil)),
    __metadata("design:paramtypes", [OAuth_Util_1.OAuthUtil])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=OAuth20.js.map