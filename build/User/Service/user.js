"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@leapjs/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("reflect-metadata");
const User_1 = require("../Model/User");
let UserService = class UserService {
    helloWorld() {
        return Promise.resolve({ message: "Hello World" });
    }
    userSignUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            data.password = yield bcrypt_1.default.hash(data.password, salt);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const Data = new User_1.UserModel(data);
                    const saveUser = yield Data.save();
                    resolve(saveUser);
                }
                catch (error) {
                    reject({ statusCode: 403, message: error });
                }
            }));
        });
    }
    sentOTP(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let otp = 1234;
            console.log(otp);
        });
    }
    checkUserPhoneNumber(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const registeredUser = yield User_1.UserModel.findOne({ phone: phone });
                if (registeredUser) {
                    return resolve(true);
                }
                return reject(false);
            }));
        });
    }
    forgotPassword() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
UserService = __decorate([
    (0, common_1.injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.js.map