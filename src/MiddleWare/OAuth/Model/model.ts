import { getModelForClass, mongoose, post, prop } from "@typegoose/typegoose";
import { mongoErrorHandler } from "@leapjs/common";
import { User as UserModelClass } from "./../../../User/Model/User";
import { Type } from "class-transformer";

const { Schema, model } = mongoose;
@post("save", mongoErrorHandler("users"))
@post("findOneAndUpdate", mongoErrorHandler("users"))
export class IToken {
  // @prop({ _id: true })
  // id?: string; id?: string;

  @prop({ required: true })
  public accessToken?: string;

  @prop({ required: true })
  public refreshToken?: string;
  // @Type(() => Client)
  @prop({ required: true ,allowMixed:0})
  public client?: Client;

  @Type(() => UserModelClass)
  @prop({ required: true, allowMixed:0})
  public user?: User;

  @prop({ required: false })
  public scope?: string;

  @prop({ required: true,allowMixed:0 })
  public expires?: any;

  @prop({ required: true, default: false })
  public refreshTokenExpired?: boolean;
}
export const TokenModel = getModelForClass(IToken);

// export interface IToken {
//   accessToken: string;
//   refreshToken: string;
//   client: Client;
//   user: any;
//   scope: string;
//   expires: any;
//   refreshTokenExpired: boolean;
// }
export const tokenSchema = new Schema<IToken>({
  accessToken: { type: String },
  refreshToken: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  client: { type: Schema.Types.ObjectId, ref: "client" },
  scope: { type: String },
  expires: { type: Object },
  refreshTokenExpired: { type: Boolean, default: false },
});

// export const TokenModel = model<IToken>("Token", tokenSchema);

const clientSchema = new Schema<Client>({
  grants: { type: Schema.Types.Mixed },
  id: { type: Schema.Types.Mixed },
});

export const ClientModel = model<Client>("client", clientSchema);

// ===================================================
export type Falsey = "" | 0 | false | null | undefined;

export interface User {
  [key: string]: any;
}
export interface RefreshToken {
  refreshToken: string;
  refreshTokenExpiresAt?: Date | undefined;
  scope?: string | string[] | undefined;
  client: Client;
  user: User;
  [key: string]: any;
}
type Callback<T> = (err?: any, result?: T) => void;

export interface AuthorizationCode {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope?: string | string[] | undefined;
  client: Client;
  user: User;
  [key: string]: any;
}
export interface AuthorizationCodeModel
  extends BaseModel,
    RequestAuthenticationModel {
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
export interface BaseModel {
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
export interface RequestAuthenticationModel {
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
export interface RefreshTokenModel
  extends BaseModel,
    RequestAuthenticationModel {
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
export interface Token {
  accessToken: string;
  accessTokenExpiresAt?: Date | undefined;
  refreshToken?: string | undefined;
  refreshTokenExpiresAt?: Date | undefined;
  scope?: string | string[] | undefined;
  client: Client;
  user: User;
  [key: string]: any;
}
export interface Client {
  id: string;
  redirectUris?: string | string[] | undefined;
  grants: string | string[];
  accessTokenLifetime?: number | undefined;
  refreshTokenLifetime?: number | undefined;
  [key: string]: any;
}
