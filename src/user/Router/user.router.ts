import { UserController } from "../Controller/UserController";

let router = require("express").Router();
import { container } from "/home/ist-014/Documents/OAuth20/src/common/iocConfig/config";

let controller = container.get<UserController>(UserController);
router.get("/", controller.helloWorld);
router.post("/user", controller.signUp);
export default router;
