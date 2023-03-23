"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
let router = require("express").Router();
let controller = new UserController_1.UserController();
router.get('/', controller.helloWorld);
exports.default = router;
