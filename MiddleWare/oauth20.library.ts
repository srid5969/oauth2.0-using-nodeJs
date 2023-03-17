import {
  Client,
  Falsey,
  OAuth2Server,
  Token,
  User,
  PasswordModel,
  Callback,
} from "oauth2-server";

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
let secretKey = "secret_key";
let expiresIn = "1h";
export const option: PasswordModel = {
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
    return "any";
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
    return "";
  },
  getAccessToken: function (
    accessToken: string,
    callback?: Callback<Token> | undefined
  ): Promise<Falsey | Token> {
    throw new Error("Function not implemented.");
  },
  verifyScope: function (
    token: Token,
    scope: string | string[],
    callback?: Callback<boolean> | undefined
  ): Promise<boolean> {
    throw new Error("Function not implemented.");
  },
};
const server:typeof OAuth2Server = new OAuth2Server({
  model: option,
  //   grants: ["password", "resfresh_token"],
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 4 * 60 * 60,

  debug: true,
});
