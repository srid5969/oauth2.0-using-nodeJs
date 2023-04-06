import { mongoErrorHandler } from "@leapjs/common";
import { getModelForClass, index, post, prop } from "@typegoose/typegoose";
import { IsDefined, IsEmail, MaxLength } from "class-validator";
import { UserStatus } from "../../common/constants";
import {
  EMPTY_EMAIL,
  EMPTY_FIRST_NAME,
  EMPTY_LAST_NAME,
  EMPTY_PASSWORD,
  INVALID_EMAIL,
  INVALID_FIRST_NAME,
  INVALID_LAST_NAME,
} from "../../resources/strings/app/user";

@index({ email: 1 }, { unique: true })
@post("save", mongoErrorHandler("User"))
@post("findOneAndUpdate", mongoErrorHandler("User"))
class User {
  @prop({ allowMixed: 0 })
  public _id!: any;
  @prop()
  @IsDefined({ groups: ["create"], message: EMPTY_FIRST_NAME })
  @MaxLength(50, { always: true, message: INVALID_FIRST_NAME })
  public firstName?: string;

  @prop()
  @IsDefined({ groups: ["create"], message: EMPTY_LAST_NAME })
  @MaxLength(50, { always: true, message: INVALID_LAST_NAME })
  public lastName?: string;

  @prop({ required: true, unique: true })
  @IsDefined({ groups: ["auth", "create"], message: EMPTY_EMAIL })
  @IsEmail({}, { always: true, message: INVALID_EMAIL })
  public email!: string;

  @prop({ required: true, allowMixed: 0 })
  @IsDefined({ groups: ["auth", "create"], message: EMPTY_PASSWORD })
  public password!: string;

  // @prop({ ref: Role })
  // @IsDefined({ groups: ['create'], message: ROLE_MISSING })
  // public role!: Ref<Role>;

  @prop({ default: UserStatus.NOT_VERIFIED })
  public status?: number;
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    collation:"",
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
});

export { User, UserModel };
