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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../Service/user");
const router_1 = require("@leapjs/router");
const router_2 = require("@leapjs/router");
const common_1 = require("@leapjs/common");
const OAuth20_1 = require("../../MiddleWare/OAuth/Authentication/OAuth20");
let UserController = class UserController {
    helloWorld(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                resolve(res.json(yield this.userService.helloWorld()));
            }));
        });
    }
    login(req, res) {
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return this.userService
                    .userSignUp(req.body)
                    .then((result) => {
                    return resolve(res.status(common_1.HttpStatus.OK).send(result));
                })
                    .catch((err) => {
                    return resolve(res.status(common_1.HttpStatus.CONFLICT).json(err));
                });
            });
        });
    }
};
__decorate([
    (0, common_1.inject)(() => user_1.UserService),
    __metadata("design:type", user_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    (0, router_2.Get)("/"),
    __param(0, (0, router_1.Req)()),
    __param(1, (0, router_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "helloWorld", null);
__decorate([
    (0, router_1.UseBefore)(OAuth20_1.AuthMiddleware),
    (0, router_1.Post)("/login"),
    __param(0, (0, router_1.Req)()),
    __param(1, (0, router_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, router_1.Post)("/signup"),
    __param(0, (0, router_1.Req)()),
    __param(1, (0, router_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
UserController = __decorate([
    (0, router_1.Controller)("/user")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map