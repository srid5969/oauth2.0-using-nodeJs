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
let model = oauth20_library_1.option;
function Oauth20Middleware(req, res, next) {
    const request = new oauth2_server_1.Request(req);
    const response = new oauth2_server_1.Response(res);
    request.headers["content-type"] = "application/x-www-form-urlencoded";
    const server = new oauth2_server_1.default({
        model: model,
        accessTokenLifetime: 3600,
        allowExtendedTokenAttributes: true,
    });
    console.log(req.originalUrl);
    if (req.originalUrl === "/token/auth") {
        // request.body.grant_type = "refresh_token";
        // request.body.client_id = "0";
        // request.body.client_secret = 12;
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
        // req.body.
        request.body.client_id = 12;
        request.body.client_secret = 12;
        request.body.grant_type = "password";
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
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
        // jsonwebtoken.verify(
        //   token[1],
        //   "accessTokenSecret",
        //   // { algorithms: ["HS256"] },
        //   (err, decodedToken) => {
        //     if (err) throw err;
        //   }
        // );
    }
}
exports.default = Oauth20Middleware;
