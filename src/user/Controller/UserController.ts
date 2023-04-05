import { Request, Response } from "express";
import { UserService } from "../Service/user";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet as GetMapping,
  httpPost as PostMapping,
  request,
  response,
} from "inversify-express-utils";
@controller("/user")
export class UserController extends BaseHttpController {
  constructor(
    @inject("UserService") private readonly userService: UserService
  ) {
    super();
  }
  @GetMapping("/")
  public async helloWorld(@request() req: Request, @response() res: Response) {
    res.json({ message: "Hello World" });
  }
  @PostMapping("/signup")
  public async signUp(@request() req: Request, @response() res: Response) {
    return this.userService
      .userSignUp(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}
