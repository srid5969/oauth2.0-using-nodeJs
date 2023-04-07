import { injectable } from "@leapjs/common";
import bcrypt from "bcrypt";

import "reflect-metadata";
import { User as IUser, UserModel as user } from "../Model/User";

@injectable()
export class UserService {
  
  helloWorld(): Promise<any> {
    return Promise.resolve({message:"Hello World"});
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
        reject({ statusCode: 403, message:error });
      }
    });
  }
}
