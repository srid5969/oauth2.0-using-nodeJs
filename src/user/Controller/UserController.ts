import { Request, Response } from "express";
import { UserService } from "../Service/user";
import { Controller, Post, Req, Res } from "@leapjs/router";
import { Get } from "@leapjs/router";
import { inject } from "@leapjs/common";

@Controller("/user")
export class UserController {
  // constructor(@inject(UserService) private userService: UserService) {}
  @inject(() => UserService) userService!: UserService;
  @Get("/")
  public async helloWorld(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    // Logger
    return new Promise<Response>(async (resolve, reject) => {
      resolve(res.json(await this.userService.helloWorld()));
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
         return resolve(res.send(result));
        })
        .catch((err) => {
          console.log(err);
         return reject(res.send(err));
        });
    });
  }
}
