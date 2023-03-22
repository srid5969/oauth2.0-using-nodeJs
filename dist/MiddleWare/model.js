"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    client: { type: mongoose_1.Schema.Types.ObjectId, ref: "Client", required: true },
    scope: { type: String, required: true },
    expires: { type: Date, required: true },
});
exports.TokenModel = (0, mongoose_1.model)("Token", tokenSchema);
