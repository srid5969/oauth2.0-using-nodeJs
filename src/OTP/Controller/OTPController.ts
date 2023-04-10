import { inject } from "@leapjs/common";
import { Controller, Param, Post, Res } from "@leapjs/router";
import { Response } from "express";
import { OTPService } from "../Service/OtpService";

@Controller("/verify")
export class OTPController {
  @inject(OTPService)
  private service?: OTPService;
  @Post("/:phone")
  public async forgotPassword(
    @Param("phone") phone: number,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.service?.sendOtpToPhone(phone);
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }   
  }
}
