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
const router_1 = require("@leapjs/router");
const common_1 = require("@leapjs/common");
let ErrorHandler = class ErrorHandler {
    after(err, req, res, next) {
        let error = err;
        if (error === undefined) {
            return next();
        }
        if (error.statusCode !== undefined && error.message !== undefined) {
            error = new common_1.HttpException(error.statusCode, error.message);
        }
        if (error.httpCode !== undefined && error.name === 'ParamRequiredError') {
            error = new common_1.BadRequestException('Invalid parameters provided');
        }
        if (error.errors !== undefined && Object.keys(error.errors).length) {
            this.logger.error(error.errors, error.stack, 'ErrorHandler');
            res.status(error.status).send({ errors: { messages: error.errors } });
        }
        else {
            this.logger.error(error.message, error.stack, 'ErrorHandler');
            res
                .status(error.status ? error.status : common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ errors: { messages: [error.message] } });
        }
    }
};
__decorate([
    (0, common_1.inject)(common_1.Logger),
    __metadata("design:type", common_1.Logger)
], ErrorHandler.prototype, "logger", void 0);
ErrorHandler = __decorate([
    (0, router_1.Middleware)()
], ErrorHandler);
exports.default = ErrorHandler;
//# sourceMappingURL=error-handler.js.map