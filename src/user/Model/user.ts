import { Schema, model } from "mongoose";

export interface IUser {
  id: any;
  _id: any;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
  modifiedAt: Date;
}
//
export const userSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true, select: false },
    role: {
      enum: {
        values: ["Admin"],
      },
    },
    createdAt: { type: Date, default: Date.now() },
    modifiedAt: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
    autoIndex: false,
    autoCreate: false,
  }
);


const User = model<IUser>("users", userSchema);
export default User;
