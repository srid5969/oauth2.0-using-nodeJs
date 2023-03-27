import { Request, Response } from "express";
import { UserSignUp } from "../service/user";
export class UserController {
  helloWorld(req: Request, res: Response) {
    res.send({ message: "Hello World" });
  }
  signUp(req: Request, res: Response) {
    UserSignUp(req.body)
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
