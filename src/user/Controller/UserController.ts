import { Request, Response } from "express";
import { UserService } from "../Service/user";
import { inject } from "inversify";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
} from "routing-controllers";

@Controller("/user")
export class UserController {
  constructor(
    @inject("UserService") private readonly userService: UserService
  ) {}
  @Get("/")
  public async helloWorld(@Req() req: Request, @Res() res: Response) {
    res.send({ message: "Hello World" });
  }
  @Post("/signup")
  public async signUp(@Req() req: Request, @Res() res: Response) {
    return await this.userService.userSignUp(req.body);
  }
}
