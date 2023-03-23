import bcryptjs from "bcrypt";
require("dotenv").config();
import jsonwebtoken from "jsonwebtoken";
import * as uuid from "uuid";
import {
  Client,
  ClientModel,
  Falsey,
  IToken,
  Token,
  TokenModel,
  User,
} from "./model";
import {
  AccessDeniedError,
  InvalidTokenError,
  OAuthError,
  RefreshToken,
} from "oauth2-server";
import user, { IUser } from "../user/model/user";
import { model } from "mongoose";

const accessTokenSecret = process.env.jwtSecretKey || "dfghs3e";
var now = new Date();
now.setTime(now.getTime() + 1 * 60 * 1000);
let expiresIn = now;
export const option = {
  getClient: async (
    clientId: string,
    clientSecret: string
  ): Promise<Client | Falsey> => {
    const data: Client = await ClientModel.findOne({
      id: clientId,
      secret: clientSecret,
    });

    return data;
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
    plainPassword: string
  ): Promise<User | Falsey> => {
    return new Promise<any>(async (resolve, reject) => {
      if (!(username && plainPassword)) {
        new OAuthError("please enter username and password", {
          name: "no_username_or_password",
          code: 404,
        });
        return reject({
          message: "please enter username and password",
        });
      }
      const data: IUser = await user.findOne({ username }, { password: 1 });
      if (data) {
        /**
         * TODO : Login
         * !comparing
         * @param password  plain text password
         * @param data.password bcrypt password
         */

        const Data = await bcryptjs.compare(plainPassword, data.password);
        if (Data) {
          let userData = { username, id: data._id };
          return resolve(userData);
        } else {
          reject({ message: "wrong password" });
        }
      } else {
        const err = new AccessDeniedError("Bad Request", { code: 404 });

        reject(err);
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
  generateAccessToken: async (
    client: Client,
    user: User,
    scope: string | string[]
  ): Promise<string> => {
    return jsonwebtoken.sign({ ...user, client, scope }, accessTokenSecret, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
  },
  getAccessToken: async function (
    accessToken: string
  ): Promise<Falsey | Token> {
    try {
      let data: any = (await jsonwebtoken.verify(
        accessToken,
        accessTokenSecret,
        { algorithms: ["HS256"] }
      )) as any;
      if (data) {
        return new Promise(async function (resolve, reject) {
          let Data: any = await TokenModel.findOne({
            accessToken: accessToken,
          });
          Data.user = data;
          Data.accessTokenExpiresAt = Data.expires;

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
    throw new Error("Function verifyScope not implemented.");
    return false;
  },
  revokeToken: async (token: RefreshToken | Token): Promise<boolean> => {
    let data = await TokenModel.findOneAndUpdate(
      { refreshToken: token.refreshToken },
      { refreshTokenExpired: true }
    );
    console.log("==============================================", data);

    if (data) {
      return true;
    }
    throw new InvalidTokenError("Access Token Expired");
  },
  getRefreshToken: async (
    refreshToken: string
  ): Promise<RefreshToken | Falsey> => {
    let present: Date = new Date();
    console.log(present);
    // refreshTokenExpired
    let data = await TokenModel.findOne({
      refreshToken: refreshToken,
      refreshTokenExpired: false,
    }).populate({ path: "client" });

    return data;
  },
  validateScope: async (
    user: User,
    client: Client,
    scope: string | string[]
  ): Promise<string | string[] | Falsey> => {
    return "read";
  },
};
