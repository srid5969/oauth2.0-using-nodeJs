"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleStatus = exports.UserStatus = exports.logLevels = exports.validEnvironments = void 0;
var validEnvironments;
(function (validEnvironments) {
    validEnvironments["development"] = "development";
    validEnvironments["production"] = "production";
})(validEnvironments || (validEnvironments = {}));
exports.validEnvironments = validEnvironments;
const logLevels = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};
exports.logLevels = logLevels;
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["NOT_VERIFIED"] = 0] = "NOT_VERIFIED";
    UserStatus[UserStatus["VERIFIED"] = 1] = "VERIFIED";
    UserStatus[UserStatus["RESET_PASSWORD_ON_LOGIN"] = 2] = "RESET_PASSWORD_ON_LOGIN";
})(UserStatus || (UserStatus = {}));
exports.UserStatus = UserStatus;
var RoleStatus;
(function (RoleStatus) {
    RoleStatus[RoleStatus["DISABLED"] = 0] = "DISABLED";
    RoleStatus[RoleStatus["ACTIVE"] = 1] = "ACTIVE";
})(RoleStatus || (RoleStatus = {}));
exports.RoleStatus = RoleStatus;
//# sourceMappingURL=constants.js.map