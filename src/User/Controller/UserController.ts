import { Request, Response } from "express";
import { UserService } from "../Service/user";
import { Controller, Post, Req, Res, UseBefore } from "@leapjs/router";
import { Get } from "@leapjs/router";
import { HttpStatus, inject } from "@leapjs/common";
import { AuthMiddleware } from '../../MiddleWare/OAuth/Authentication/OAuth20';

@Controller("/user")
@UseBefore(AuthMiddleware)
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
  @UseBefore(AuthMiddleware)
  @Post("/login")
  public login(@Req() req: Request, @Res() res: Response): void {
    
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
          return resolve(res.status(HttpStatus.OK).send(result));
        })
        .catch((err) => {
          return resolve(res.status(HttpStatus.CONFLICT).json(err));
        });
    });
  }
}
