import { Request, Response } from "express";
export class UserController {
  helloWorld(req: Request, res: Response) {
    res.send({ message: "Hello World" });
  }
}
