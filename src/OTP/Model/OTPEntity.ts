import { getModelForClass, index, prop } from "@typegoose/typegoose";
@index({ createdAt: 1 }, { expireAfterSeconds: 30 })
class OTPModel {
  @prop({ required: false })
  public email?: string;

  @prop({ required: false })
  public number?: number;

  @prop({ required: true })
  public otp?: number;

  @prop({ required: true })
  public createdAt!: Date;
}
const OTP = getModelForClass(OTPModel, {});
export { OTP, OTPModel };
