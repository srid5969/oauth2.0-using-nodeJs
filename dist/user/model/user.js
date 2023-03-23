"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true, select: false },
    role: {
        enum: {
            values: ["Admin"],
        },
    },
}, {
    versionKey: false,
    autoIndex: false,
    autoCreate: false,
});
exports.userSchema.methods.setPassword = function (password) { };
exports.userSchema.methods.validPassword = function (password) {
    return "this.hash === hash";
};
const User = (0, mongoose_1.model)("users", exports.userSchema);
exports.default = User;
