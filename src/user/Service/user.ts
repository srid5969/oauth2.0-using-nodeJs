import { injectable } from "@leapjs/common";
import bcrypt from "bcrypt";

import "reflect-metadata";
import { UserModel as user, User as IUser } from "../../user/Model/User";

export interface UserServiceI {
  userSignUp(data: IUser): Promise<IUser | any>;
  helloWorld(): Promise<any>;
}

@injectable()
export class UserService implements UserServiceI {
  helloWorld(): Promise<any> {
    return Promise.all("Hello World");
  }
  public async userSignUp(data: IUser): Promise<IUser | any> {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    return new Promise<IUser | any>(async (resolve, reject) => {
      try {
        const Data = new user(data);
        const saveUser = await Data.save();
        resolve(saveUser);
      } catch (error) {
        reject({ statusCode: 403, error });
      }
    });
  }
}
