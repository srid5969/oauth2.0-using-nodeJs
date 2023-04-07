export class OTPService {
  public async generateOtp(): Promise<number> {
    const min = 1000;
    const max = 9999;
    const otp = Math.floor(Math.random() * (max - min + 1) + min);
    return otp;
  }
  public async sendOtpToPhone(phone: number) {
    
  }
  public async sendOtpToEmail(email: string) {}
}
