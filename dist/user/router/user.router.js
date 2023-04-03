"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../Controller/UserController");
let router = require("express").Router();
const config_1 = require("../../common/iocConfig/config");
let controller = config_1.container.get(UserController_1.UserController);
router.get("/", controller.helloWorld);
router.post("/user", controller.signUp);
exports.default = router;
