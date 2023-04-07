import { Body, Controller, Post, UseBefore } from "@leapjs/router";
import { AuthMiddleware } from "../Authentication/OAuth20";
@Controller("/token")
export class AccessTokenGeneratorForRefreshToken {
  constructor() {}
  @UseBefore(AuthMiddleware)
  @Post("/auth")

  public simplepost(  @Body() req: any,): void {
  }
}
