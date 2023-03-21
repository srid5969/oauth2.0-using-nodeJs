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
import mongoose from "mongoose";
interface User {
  [key: string]: any;
}
interface RefreshToken {
  refreshToken: string;
  refreshTokenExpiresAt?: Date | undefined;
  scope?: string | string[] | undefined;
  client: Client;
  user: User;
  [key: string]: any;
}
type Callback<T> = (err?: any, result?: T) => void;

interface AuthorizationCode {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope?: string | string[] | undefined;
  client: Client;
  user: User;
  [key: string]: any;
}
interface AuthorizationCodeModel extends BaseModel, RequestAuthenticationModel {
  /**
   * Invoked to generate a new refresh token.
   *
   */
  generateRefreshToken?(
    client: Client,
    user: User,
    scope: string | string[],
    callback?: Callback<string>
  ): Promise<string>;

  /**
   * Invoked to generate a new authorization code.
   *
   */
  generateAuthorizationCode?(
    client: Client,
    user: User,
    scope: string | string[],
    callback?: Callback<string>
  ): Promise<string>;

  /**
   * Invoked to retrieve an existing authorization code previously saved through Model#saveAuthorizationCode().
   *
   */
  getAuthorizationCode(
    authorizationCode: string,
    callback?: Callback<AuthorizationCode>
  ): Promise<AuthorizationCode | Falsey>;

  /**
   * Invoked to save an authorization code.
   *
   */
  saveAuthorizationCode(
    code: Pick<
      AuthorizationCode,
      "authorizationCode" | "expiresAt" | "redirectUri" | "scope"
    >,
    client: Client,
    user: User,
    callback?: Callback<AuthorizationCode>
  ): Promise<AuthorizationCode | Falsey>;

  /**
   * Invoked to revoke an authorization code.
   *
   */
  revokeAuthorizationCode(
    code: AuthorizationCode,
    callback?: Callback<boolean>
  ): Promise<boolean>;

  /**
   * Invoked to check if the requested scope is valid for a particular client/user combination.
   *
   */
  validateScope?(
    user: User,
    client: Client,
    scope: string | string[],
    callback?: Callback<string | Falsey>
  ): Promise<string | string[] | Falsey>;
}
interface BaseModel {
  /**
   * Invoked to generate a new access token.
   *
   */
  generateAccessToken?(
    client: Client,
    user: User,
    scope: string | string[],
    callback?: Callback<string>
  ): Promise<string>;

  /**
   * Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
   *
   */
  getClient(
    clientId: string,
    clientSecret: string,
    callback?: Callback<Client | Falsey>
  ): Promise<Client | Falsey>;

  /**
   * Invoked to save an access token and optionally a refresh token, depending on the grant type.
   *
   */
  saveToken(
    token: Token,
    client: Client,
    user: User,
    callback?: Callback<Token>
  ): Promise<Token | Falsey>;
}
interface RequestAuthenticationModel {
  /**
   * Invoked to retrieve an existing access token previously saved through Model#saveToken().
   *
   */
  getAccessToken(
    accessToken: string,
    callback?: Callback<Token>
  ): Promise<Token | Falsey>;

  /**
   * Invoked during request authentication to check if the provided access token was authorized the requested scopes.
   *
   */
  verifyScope(
    token: Token,
    scope: string | string[],
    callback?: Callback<boolean>
  ): Promise<boolean>;
}
interface RefreshTokenModel extends BaseModel, RequestAuthenticationModel {
  /**
   * Invoked to generate a new refresh token.
   *
   */
  generateRefreshToken?(
    client: Client,
    user: User,
    scope: string | string[],
    callback?: Callback<string>
  ): Promise<string>;

  /**
   * Invoked to retrieve an existing refresh token previously saved through Model#saveToken().
   *
   */
  getRefreshToken(
    refreshToken: string,
    callback?: Callback<RefreshToken>
  ): Promise<RefreshToken | Falsey>;

  /**
   * Invoked to revoke a refresh token.
   *
   */
  revokeToken(
    token: RefreshToken | Token,
    callback?: Callback<boolean>
  ): Promise<boolean>;
}
interface Token {
  accessToken: string;
  accessTokenExpiresAt?: Date | undefined;
  refreshToken?: string | undefined;
  refreshTokenExpiresAt?: Date | undefined;
  scope?: string | string[] | undefined;
  client: Client;
  user: User;
  [key: string]: any;
}
interface Client {
  id: string;
  redirectUris?: string | string[] | undefined;
  grants: string | string[];
  accessTokenLifetime?: number | undefined;
  refreshTokenLifetime?: number | undefined;
  [key: string]: any;
}

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
    return {
      accessToken: "s",
      refreshToken: "s",
      demo: "",
      client: { id: "1", grants: ["password"] },
      user: { id: "1" },
    };
  },
  //getUser BaseModel
  getUser: async (
    username: string,
    password: string
  ): Promise<User | Falsey> => {
    return {
      id: "2",
      username: "sri",
      password: "1234",
    };
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
