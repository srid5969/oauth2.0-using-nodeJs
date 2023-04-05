import mongoose, { Document, Schema, model } from "mongoose";

export interface IMedicalReport {
  doctorId: object;
  hospital_id: object;
  description: string;
}

export interface IUser {
  id: any;
  _id: any;
  username: string;
  password: string;
  role: string;
  dob: Date;
  medicalHistory: IMedicalReport[];
  createdAt: Date;
  modifiedAt: Date;
  deleted: boolean;
}

// Define a type for the Role document
export interface IRole {
  userId: string; // reference to User document
  edit: string; // edit permission string, e.g. "user:own"
  view: string; // view permission string, e.g. "user:any"
  delete: string; // delete permission string, e.g. "user:own"
}

// Define the Role schema
const RoleSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  edit: {
    type: String,
    required: true,
    enum: ["user:own", "user:any", "admin"],
    default: "user:own",
  },
  view: {
    type: String,
    required: true,
    enum: ["user:own", "user:any", "admin"],
    default: "user:own",
  },
  delete: {
    type: String,
    required: true,
    enum: ["user:own", "user:any", "admin"],
    default: "user:own",
  },
});

// Define and export the Role model
export const Role = mongoose.model<IRole>("Role", RoleSchema);
export const userSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true, select: false },
    role: {
      type: String,
      enum: ["Patient"],
      required: [false, "Please specify at role"],
    },
    createdAt: { type: Date, default: Date.now() },
    modifiedAt: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
    autoCreate: false,
  }
);

const User = model<IUser>("users", userSchema);
export default User;
