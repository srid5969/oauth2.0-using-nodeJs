import { UserController } from "../Controller/UserController";

let router = require("express").Router();
import {container} from "../../common/iocConfig/config";


let controller = container.get<UserController>(UserController);
router.get("/", controller.helloWorld);
router.post("/user/signUp", controller.signUp);
export default router;
