import { Request, Response } from "express";
import { UserService } from "../Service/user";
import { Controller, Post, Req, Res } from "@leapjs/router";
import { Get } from "@leapjs/router";
import { inject } from "@leapjs/common";

@Controller("/user")
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}
  //  private  userService!: UserService;
  // @inject(() => UserService) userService!: UserService;
  @Get("/")
  public async helloWorld(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    // Logger
    return new Promise<Response>((resolve, reject) => {
      resolve(res.json({ message: "Hello World" }));
    });
  }
  @Post("/signup")
  public async signUp(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    
    return new Promise<Response>((resolve, reject) => {
      return this.userService
        .userSignUp(req.body)
        .then((result) => {
          resolve(res.send(result));
        })
        .catch((err) => {
          reject(res.json(err));
        });
    });
  }
}
