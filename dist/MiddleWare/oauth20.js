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
    req.headers["content-type"] = "application/x-www-form-urlencoded";
    const request = new oauth2_server_1.Request(req);
    const response = new oauth2_server_1.Response(res);
    // console.log(request.headers);
    const server = new oauth2_server_1.default({
        model: model,
        accessTokenLifetime: 3600,
        allowExtendedTokenAttributes: true,
        //   debug: true
    });
    if (req.originalUrl === "/user/login") {
        // req.body.
        request.body.client_id = 12;
        request.body.client_secret = 12;
        request.body.grant_type = 'password';
        console.log(request.body);
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            server
                .token(request, response)
                .then((token) => {
                console.log(token);
                res.send(token);
            })
                .catch((err) => {
                res.send(err);
                console.log(err);
            });
        }
        else {
            res.json({ message: "please enter username and password" });
        }
    }
    else {
        // console.log(req.headers.authorization);
        let token = req.headers.authorization.split(" ") || "";
        console.log(token[1]);
        server
            .authenticate(request, response)
            .then((token) => {
            console.log(token);
            res.send(token);
        })
            .catch((err) => {
            res.send(err);
            console.log(err);
        });
        // jsonwebtoken.verify(
        //   token[1],
        //   "accessTokenSecret",
        //   // { algorithms: ["HS256"] },
        //   (err, decodedToken) => {
        //     if (err) throw err;
        //     console.log(decodedToken); // this is your decoded JWT with user details
        //   }
        // );
    }
}
exports.default = Oauth20Middleware;
