import { UserController } from "../controller/UserController";

let router = require("express").Router();
let controller=new UserController();
router.get('/',controller.helloWorld)
export default router