import {
  Client,
  Falsey,
  OAuth2Server,
  Token,
  User,
  PasswordModel,ServerOptions, ExtensionModel, RefreshTokenModel, ClientCredentialsModel, AuthorizationCodeModel
  
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
export const option:AuthorizationCodeModel | ClientCredentialsModel | RefreshTokenModel | PasswordModel | ExtensionModel = {
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
  getAccessToken: async function (accessToken: string): Promise<Falsey | Token> {
    throw new Error("Function not implemented.");
  },
  verifyScope: async function (
    token: Token,
    scope: string | string[]
  ): Promise<boolean> {
    throw new Error("Function not implemented.");
    return false
  },
};
const server = new OAuth2Server({
  model: option,
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 4 * 60 * 60,
});
