import bcrypt from "bcrypt";

import user, { IUser } from "../model/user";

export async function UserSignUp(data: IUser): Promise<IUser | any> {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);
  return new Promise<IUser | any>(async (resolve, reject) => {
    try {
      const Data = new user(data);
      const saveUser = await Data.save();
      resolve(saveUser);
    } catch (error) {
      reject({ statusCode: 403,error });
    }
  });
}
export async function logout(data) {}
