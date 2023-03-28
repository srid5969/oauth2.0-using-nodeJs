"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../Service/user");
const inversify_1 = require("inversify");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    helloWorld(req, res) {
        res.send({ message: "Hello World" });
    }
    signUp(req, res) {
        this.userService
            .userSignUp(req.body)
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            err.statusCode
                ? res.status(err.statusCode).json({ err })
                : res.status(403).json({ err });
        });
    }
};
UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(user_1.UserService)),
    __metadata("design:paramtypes", [user_1.UserService])
], UserController);
exports.UserController = UserController;
