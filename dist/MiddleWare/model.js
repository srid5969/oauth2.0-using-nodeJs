"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    accessToken: { type: String },
    refreshToken: { type: String },
    user: { type: mongoose_1.Schema.Types.Mixed, ref: "User" },
    client: { type: mongoose_1.Schema.Types.Mixed, ref: "Client" },
    scope: { type: String },
    expires: { type: Object },
});
exports.TokenModel = (0, mongoose_1.model)("Token", tokenSchema);
