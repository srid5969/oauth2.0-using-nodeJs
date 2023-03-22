import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import * as uuid from "uuid";
import { Client, Falsey, IToken, Token, TokenModel, User } from "./model";
const accessTokenSecret = process.env.jwtSecretKey || "dfghs3e";
var now = new Date();
now.setTime(now.getTime() + 1 * 3600 * 1000);
let expiresIn = now;
export const option = {
  getClient: async (
    clientId: string,
    clientSecret: string
  ): Promise<Client | Falsey> => {
    return { id: "1", grants: ["password"] };
  },
  saveToken: async (
    token: Token,
    client: Client,
    user: User
  ): Promise<Token | Falsey> => {

    const _token: IToken = new TokenModel({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      client: client,
      user: user,
      scope: token.scope,
      expires: expiresIn,
    });

    return await _token.save();
  },
  getUser: async (
    username: string,
    password: string
  ): Promise<User | Falsey> => {
    return new Promise<any>(async (resolve, reject) => {
      let data: any = await TokenModel.findOne(
        { username },
        { _id: 1, password: 1, username: 1 }
      );

      if (!(username && password)) {
        reject({
          message: "please enter username and password",
        });
        return;
      }
      //if  data
      if (data) {
        /**
         * TODO : Login
         * !comparing
         * @param password  plain text password
         * @param data.password bcrypt password
         */
        const Data = await bcryptjs.compare(password, data.password);
        if (Data) {
          return resolve(Data);
          // await generateToken(data._id)
          //   .catch((err) => reject({message:err.toString()}))
          //   .then((token) => resolve({ username:data.username,id:data._id,token }));
        } else {
          reject({ message: "wrong password" });
        }
      } else {
        // reject({ message: "user cannot be found" });
        resolve({
          id: "1",
          username: "thala",
          password: "sri",
          scope: ["write"],
        });
      }
    });
  },
  generateRefreshToken: async (
    client: Client,
    user: User,
    scope: string | string[]
  ): Promise<string> => {
    let refreshTokens: any = await uuid.v4();
    return refreshTokens;
  },
  validateScope: async (
    user: User,
    client: Client,
    scope: string | string[]
  ): Promise<string | string[] | Falsey> => {
    return "read";
  },
  generateAccessToken: async (
    client: Client,
    user: User,
    scope: string | string[]
  ): Promise<string> => {
    return jsonwebtoken.sign({ ...user, client, scope }, accessTokenSecret, {
      expiresIn: "1h",
    });
  },
  getAccessToken: async function (
    accessToken: string
  ): Promise<Falsey | Token> {
    console.log("===================================");
    try {
      let data = (await jsonwebtoken.verify(
        accessToken,
        accessTokenSecret
      )) as any;
      if (data) {
        return new Promise(async function (resolve, reject) {
          let Data: any = await TokenModel.findOne({
            accessToken: accessToken,
          });
          Data.accessTokenExpiresAt = Data.expires
          console.log(Data);

          return resolve(Data);
        });
      }
    } catch (error) {
      return error;
    }
  },
  verifyScope: async function (
    token: Token,
    scope: string | string[]
  ): Promise<boolean> {
    throw new Error("Function not implemented.");
    return false;
  },
};
