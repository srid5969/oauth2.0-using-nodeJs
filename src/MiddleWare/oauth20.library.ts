import {
  Falsey,
  OAuth2Server,
  PasswordModel,
  ServerOptions,
  ExtensionModel,
  ClientCredentialsModel,
} from "oauth2-server";
import bcryptjs from "bcryptjs";
import * as uuid from "uuid";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import mongoose, { model } from "mongoose";
import {
  AuthorizationCodeModel,
  IToken,
  RefreshTokenModel,
  Token,
  TokenModel,
  Client,
  User,
} from "./model";

let tokens; //mongodb
let users = [
  {
    id: "1",
    username: "thala",
    password: "sri",
  },
  {
    id: "2",
    username: "sri",
    password: "1234",
  },
];
const accessTokenSecret = "accessTokenSecret";
const refreshTokenSecret = "refreshTokenSecret";
// let secretKey = "secret_key";
let expiresIn = "1h";
export const option:
  | AuthorizationCodeModel
  | ClientCredentialsModel
  | RefreshTokenModel
  | PasswordModel
  | ExtensionModel = {
  //getClient BaseModel
  getClient: async (
    clientId: string,
    clientSecret: string
  ): Promise<Client | Falsey> => {
    return { id: "1", grants: ["password"] };
  },
  //saveToken BaseModel
  saveToken: async (
    token: Token,
    client: Client,
    user: User
  ): Promise<Token | Falsey> => {
    const _token: IToken = new TokenModel({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      clientId: token.client.id,
      userId: token.user.id,
      scope: token.scope,
      expires: "1h",
    });

    return await token.save();
  },
  //getUser BaseModel
  getUser: async (
    username: string,
    password: string
  ): Promise<User | Falsey> => {
    return new Promise<any>(async (resolve, reject) => {
      let data: any = await model("users").findOne(
        { username },
        { _id: 1, password: 1, username: 1 }
      );

      if (!(username && password)) {
        reject({
          message: "First enter username and password miss Frontend developer",
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
        reject({ message: "user cannot be found" });
      }
    });
  },
  generateRefreshToken: async (
    client: Client,
    user: User,
    scope: string | string[]
  ): Promise<string> => {
    let refreshTokens; //=[refreshTokenSecret]
    const refreshToken = uuid.v4();
    refreshTokens.push(refreshToken);
    refreshTokens.push(client);
    refreshTokens.push(user);
    refreshTokens.push(scope);
    return refreshTokens;
  },
  validateScope: async (
    user: User,
    client: Client,
    scope: string | string[]
  ): Promise<string | string[] | Falsey> => {
    return 0;
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
    let data = jsonwebtoken.verify(accessToken, accessTokenSecret) as any;
    return new Promise(function (resolve, reject) {
      tokens.findOne({ access_token: accessToken }, function (err, token) {
        if (err) reject(err);
        resolve({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          client: { id: token.client.id, grants: ["password"] },
          user: { id: token.user.id },
        });
      });
    });
    return {
      accessToken: "s",
      refreshToken: "s",
      demo: "",
      client: { id: "1", grants: ["password"] },
      user: { id: data.user.id },
    };
  },
  verifyScope: async function (
    token: Token,
    scope: string | string[]
  ): Promise<boolean> {
    throw new Error("Function not implemented.");
    return false;
  },
};
const server = new OAuth2Server({
  model: option,
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 4 * 60 * 60,
});
server;
