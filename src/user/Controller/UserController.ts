import { Request, Response } from "express";
import { UserService } from "../Service/user";
import { injectable, inject, Container } from "inversify";
import {
  controller,
  httpGet as GetMapping,
  httpPost as PostMapping,
} from "inversify-express-utils";
@controller("/user")
export class UserController {
  constructor(
    @inject("UserService") private readonly userService: UserService
  ) {}
  @GetMapping("/")
  helloWorld(req: Request, res: Response) {
    res.send({ message: "Hello World" });
  }
  @PostMapping("/signup")
  async signUp(req: Request, res: Response) {
    return await this.userService.userSignUp(req.body);
  }
}
