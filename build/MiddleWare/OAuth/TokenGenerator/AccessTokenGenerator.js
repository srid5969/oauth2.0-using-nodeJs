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
exports.AccessTokenGeneratorForRefreshToken = void 0;
const router_1 = require("@leapjs/router");
const OAuth20_1 = require("../Authentication/OAuth20");
let AccessTokenGeneratorForRefreshToken = class AccessTokenGeneratorForRefreshToken {
    constructor() { }
    simplepost(req) {
    }
};
__decorate([
    (0, router_1.UseBefore)(OAuth20_1.AuthMiddleware),
    (0, router_1.Post)("/auth"),
    __param(0, (0, router_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccessTokenGeneratorForRefreshToken.prototype, "simplepost", null);
AccessTokenGeneratorForRefreshToken = __decorate([
    (0, router_1.Controller)("/token"),
    __metadata("design:paramtypes", [])
], AccessTokenGeneratorForRefreshToken);
exports.AccessTokenGeneratorForRefreshToken = AccessTokenGeneratorForRefreshToken;
//# sourceMappingURL=AccessTokenGenerator.js.map