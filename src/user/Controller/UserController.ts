import { Request, Response } from "express";
import { UserService } from "../Service/user";
import { injectable, inject, Container } from "inversify";
@injectable()
export class UserController {
  constructor(@inject(UserService) private readonly userService: UserService) {}
  helloWorld(req: Request, res: Response) {
    res.send({ message: "Hello World" });
  }
  signUp(req: Request, res: Response) {
    this.userService
      .userSignUp(req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        err.statusCode
          ? res.status(err.statusCode).json({ err })
          : res.status(403).json({ err });
      });
  }
}

