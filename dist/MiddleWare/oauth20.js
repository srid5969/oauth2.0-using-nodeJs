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
Object.defineProperty(exports, "__esModule", { value: true });
const oauth2_server_1 = __importStar(require("oauth2-server"));
const oauth20_library_1 = require("./oauth20.library");
function Oauth20Middleware(req, res, next) {
    const request = new oauth2_server_1.Request(req);
    const response = new oauth2_server_1.Response(res);
    request.headers["content-type"] = "application/x-www-form-urlencoded";
    const server = new oauth2_server_1.default({
        model: oauth20_library_1.option,
        accessTokenLifetime: 3600,
        allowExtendedTokenAttributes: true,
    });
    if (req.originalUrl === "/token/auth") {
        server
            .token(request, response)
            .then((token) => {
            res.send(token);
        })
            .catch((err) => {
            console.log(err);
            err.statusCode
                ? res.status(err.statusCode).json(err)
                : res.send(err).status(400);
        });
        return;
    }
    if (req.originalUrl === "/user/login") {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            server
                .token(request, response)
                .then((token) => {
                res.send(token);
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
    }
    else {
        let token = req.headers.authorization.split(" ") || "";
        if (token[1]) {
            server
                .authenticate(request, response)
                .then((token) => {
                // return res.send(token);
                next();
            })
                .catch((err) => {
                return err.statusCode
                    ? res.status(err.statusCode).json(err)
                    : res.send(err).status(400);
            });
        }
    }
}
exports.default = Oauth20Middleware;
