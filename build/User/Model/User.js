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
exports.UserModel = exports.User = void 0;
const common_1 = require("@leapjs/common");
const typegoose_1 = require("@typegoose/typegoose");
class HumanName {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], HumanName.prototype, "use", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], HumanName.prototype, "family", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], HumanName.prototype, "given", void 0);
class Address {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "use", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Address.prototype, "line", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "postalCode", void 0);
let User = class User {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: "Patient" }),
    __metadata("design:type", String)
], User.prototype, "resourceType", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, allowMixed: 0 }),
    __metadata("design:type", Array)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, allowMixed: 0 }),
    __metadata("design:type", Array)
], User.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, allowMixed: 0 }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, allowMixed: 0 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, typegoose_1.index)({ email: 1, phone: 1 }, { unique: true }),
    (0, typegoose_1.post)("save", (0, common_1.mongoErrorHandler)("users")),
    (0, typegoose_1.post)("findOneAndUpdate", (0, common_1.mongoErrorHandler)("users"))
], User);
exports.User = User;
const UserModel = (0, typegoose_1.getModelForClass)(User, {
    schemaOptions: {
        collection: "users",
        versionKey: false,
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    },
});
exports.UserModel = UserModel;
//# sourceMappingURL=User.js.map