import { mongoErrorHandler } from "@leapjs/common";
import { getModelForClass, index, post, prop } from "@typegoose/typegoose";
class HumanName {
  @prop({ required: true })
  use!: string;

  @prop({ required: true })
  family!: string;

  @prop({ required: true })
  given!: string[];
}

class Address {
  @prop({ required: true })
  use!: string;

  @prop({ required: true })
  line!: string[];

  @prop({ required: true })
  city!: string;

  @prop({ required: true })
  state!: string;

  @prop({ required: true })
  postalCode!: string;
}

@index({ email: 1, phone: 1 }, { unique: true })
@post("save", mongoErrorHandler("users"))
@post("findOneAndUpdate", mongoErrorHandler("users"))
class User {
  // @prop({ _id: true })
  // id?: string; id?: string;

  @prop({ required: true })
  username?: string;

  @prop({ required: true, default: "Patient" })
  resourceType!: string;

  @prop({ required: true, default: true })
  active!: boolean;

  @prop({ required: true, allowMixed: 0 })
  name!: HumanName[];

  @prop({ required: true })
  gender!: string;

  @prop({ required: true })
  birthDate!: string;

  @prop({ required: true, allowMixed: 0 })
  address!: Address[];

  @prop({ required: true, allowMixed: 0 })
  phone!: number;

  @prop({ required: true, allowMixed: 0 })
  password!: string;
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    collection: "users",
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
});

export { User, UserModel };
