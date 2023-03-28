"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const inversify_1 = require("inversify");
require("reflect-metadata");
const user_1 = __importDefault(require("../Model/user"));
let UserService = class UserService {
    async userSignUp(data) {
        const salt = await bcrypt_1.default.genSalt(10);
        const password = await bcrypt_1.default.hash(data.password, salt);
        return new Promise(async (resolve, reject) => {
            try {
                const Data = new user_1.default(data);
                const saveUser = await Data.save();
                resolve(saveUser);
            }
            catch (error) {
                reject({ statusCode: 403, error });
            }
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)()
], UserService);
exports.UserService = UserService;
