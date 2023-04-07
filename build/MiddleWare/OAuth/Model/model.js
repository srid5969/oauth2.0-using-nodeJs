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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = exports.tokenSchema = exports.TokenModel = exports.IToken = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const common_1 = require("@leapjs/common");
const User_1 = require("./../../../User/Model/User");
const class_transformer_1 = require("class-transformer");
const { Schema, model } = typegoose_1.mongoose;
let IToken = class IToken {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], IToken.prototype, "accessToken", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], IToken.prototype, "refreshToken", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, allowMixed: 0 }),
    __metadata("design:type", Object)
], IToken.prototype, "client", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => User_1.User),
    (0, typegoose_1.prop)({ required: true, allowMixed: 0 }),
    __metadata("design:type", Object)
], IToken.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", String)
], IToken.prototype, "scope", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, allowMixed: 0 }),
    __metadata("design:type", Object)
], IToken.prototype, "expires", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], IToken.prototype, "refreshTokenExpired", void 0);
IToken = __decorate([
    (0, typegoose_1.post)("save", (0, common_1.mongoErrorHandler)("users")),
    (0, typegoose_1.post)("findOneAndUpdate", (0, common_1.mongoErrorHandler)("users"))
], IToken);
exports.IToken = IToken;
exports.TokenModel = (0, typegoose_1.getModelForClass)(IToken);
exports.tokenSchema = new Schema({
    accessToken: { type: String },
    refreshToken: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    client: { type: Schema.Types.ObjectId, ref: "client" },
    scope: { type: String },
    expires: { type: Object },
    refreshTokenExpired: { type: Boolean, default: false },
});
const clientSchema = new Schema({
    grants: { type: Schema.Types.Mixed },
    id: { type: Schema.Types.Mixed },
});
exports.ClientModel = model("client", clientSchema);
//# sourceMappingURL=model.js.map