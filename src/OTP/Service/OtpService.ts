import { BadRequestException, inject, injectable } from "@leapjs/common";
import { UserService } from "../../User/Service/user";
import { OTP } from "../Model/OTPEntity";

@injectable()
export class OTPService {
  @inject(UserService)
  private userService!: UserService;

  public async generateOtp(): Promise<number> {
    const min = 1000;
    const max = 9999;
    const otp = Math.floor(Math.random() * (max - min + 1) + min);
    return otp;
  }
  public async sendOtpToPhone(phone: number) {
    const checkUser = await this.userService.checkUserPhoneNumber(phone);
    if (checkUser) {
      const otp = await this.generateOtp();
      const saveOtp = await new OTP({
        number: phone,
        otp: otp,
      })
      .save();

      return saveOtp;
    }
    throw new BadRequestException("Phone number is not registered");
  }
  public async sendOtpToEmail(email: string) {}
}
