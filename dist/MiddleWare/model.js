"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = exports.TokenModel = void 0;
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    accessToken: { type: String },
    refreshToken: { type: String },
    user: { type: mongoose_1.Schema.Types.Mixed, ref: "users" },
    client: { type: mongoose_1.Schema.Types.Mixed, ref: "client" },
    scope: { type: String },
    expires: { type: Object },
    refreshTokenExpired: { type: Boolean, default: false }
});
exports.TokenModel = (0, mongoose_1.model)("Token", tokenSchema);
const clientSchema = new mongoose_1.Schema({
    grants: { type: mongoose_1.Schema.Types.Mixed },
    id: { type: mongoose_1.Schema.Types.Mixed },
});
exports.ClientModel = (0, mongoose_1.model)("client", clientSchema);
