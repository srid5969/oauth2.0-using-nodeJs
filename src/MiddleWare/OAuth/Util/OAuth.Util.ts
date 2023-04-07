import bcrypt from "bcrypt";
import {
  AccessDeniedError,
  InvalidTokenError,
  OAuthError,
  RefreshToken,
} from "oauth2-server";
import * as uuid from "uuid";

import {
  Client,
  ClientModel,
  Falsey,
  IToken,
  Token,
  TokenModel,
  User,
} from "../Model/model";

import { injectable } from "@leapjs/common";
import jsonwebtoken from "jsonwebtoken";
import { configurations } from "../../../common/manager/config";
import { UserModel as user } from "../../../User/Model/User";

@injectable()
class OAuthUtil {
  private accessTokenSecret = configurations.jwtSecret || "";
  private expiresIn(): Date {
    var now = new Date();
    return new Date(now.setTime(now.getTime() + 1 * 120 * 1000));
  }
  public async getClient(
    clientId: string,
    clientSecret: string
  ): Promise<Client | Falsey> {
    const data: Client | any = await ClientModel.findOne({
      id: clientId,
      secret: clientSecret,
    });

    return data;
  }
  public async saveToken(
    token: Token,
    client: Client,
    user: User
  ): Promise<Token | Falsey> {
    const tokenData:IToken = {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      client: client,
      user: user,
      // scope: token.scope,
      expires: this.expiresIn(),
    };
    
    const savetoken = new TokenModel(tokenData);
    const save = await savetoken.save();
    const saved :any= await save.populate({
      path: "user",
      select: "username",
    });
    return saved;
    // return saved
  }
  public async getUser(
    username: string,
    plainPassword: string
  ): Promise<User | Falsey> {
    return new Promise<any>(async (resolve, reject) => {
      if (!(username && plainPassword)) {
        return reject(
          new OAuthError("please enter username and password", {
            name: "no_username_or_password",
            code: 404,
          })
        );
      }
      const data: any | null = await user.findOne(
        { username },
        { password: 1 }
      );

      if (data) {
        /**
         * TODO : Login
         * !comparing
         * @param password  plain text password
         * @param data.password bcrypt password
         */

        const Data = await bcrypt.compare(plainPassword, data.password);
        if (Data) {
          let userData = { username, id: data._id, _id: data._id };

          return resolve(userData);
        } else {
          reject(
            new OAuthError("wrong password", {
              code: 401,
              name: "invalid_password",
            })
          );
        }
      } else {
        const err = new AccessDeniedError("Bad Request", { code: 404 });
        reject(err);
      }
    });
  }
  public async generateRefreshToken(
    client: Client,
    user: User,
    scope: string | string[]
  ): Promise<string> {
    let refreshTokens: any = await uuid.v4();
    return refreshTokens;
  }
  public async generateAccessToken(
    client: Client,
    user: User,
    scope: string | string[]
  ): Promise<string> {
    return jsonwebtoken.sign(
      { ...user, client, scope },
      this.accessTokenSecret,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );
  }
  public async getAccessToken(
    accessToken: string
  ): Promise<Falsey | any | Token> {
    try {
      let data: any = (await jsonwebtoken.verify(
        accessToken,
        this.accessTokenSecret,
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
      throw new InvalidTokenError("Token Cannot Be Found", {
        code: 404,
        name: "invalid JWT token",
      });
    }
  }
  public async verifyScope(
    token: Token,
    scope: string | string[]
  ): Promise<boolean> {
    throw new Error("Function verifyScope not implemented.");
    // return false;
  }
  public async revokeToken(token: RefreshToken | Token): Promise<boolean> {
    let data = await TokenModel.findOneAndUpdate(
      { refreshToken: token.refreshToken },
      { refreshTokenExpired: true }
    );

    if (data) {
      return true;
    }
    throw new InvalidTokenError("Access Token Expired");
  }
  public async getRefreshToken(
    refreshToken: string
  ): Promise<RefreshToken | Falsey> {
    // refreshTokenExpired
    let data :any= await TokenModel.findOne({
      refreshToken: refreshToken,
      refreshTokenExpired: false,
    })
      .populate({ path: "user", select: "username" })
      .populate({ path: "client" });

    return data;
  }
  public async validateScope(
    user: User,
    client: Client,
    scope: string | string[]
  ): Promise<string> {
    let read: string = "read";
    return Promise.resolve(read);
  }
}
export { OAuthUtil };
