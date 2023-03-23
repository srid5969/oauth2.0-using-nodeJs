"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    helloWorld(req, res) {
        res.send({ message: "Hello World" });
    }
}
exports.UserController = UserController;
