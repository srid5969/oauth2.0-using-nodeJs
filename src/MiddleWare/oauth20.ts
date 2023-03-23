import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import oauth2Server, {
  InvalidRequestError,
  InvalidTokenError,
  Request as OAuthRequest,
  Response as OAuthResponse,
  PasswordModel,
} from "oauth2-server";
import { option } from "./oauth20.library";
let model = option;

export default function Oauth20Middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const request = new OAuthRequest(req);
  const response = new OAuthResponse(res);
  request.headers["content-type"] = "application/x-www-form-urlencoded";
  const server = new oauth2Server({
    model: model,
    accessTokenLifetime: 3600,
    allowExtendedTokenAttributes: true,
  });
  console.log(req.originalUrl);

  if (req.originalUrl === "/token/auth") {
    // request.body.grant_type = "refresh_token";
    // request.body.client_id = "0";
    // request.body.client_secret = 12;

    server
      .token(request, response)
      .then((token) => {
        res.send(token);
      })
      .catch((err) => {
        console.log(err);
        
        err.statusCode
          ? res.status(err.statusCode).json(err)
          : res.send(err).status(400);
      });
    return;
  }
  if (req.originalUrl === "/user/login") {
    // req.body.
    request.body.client_id = 12;
    request.body.client_secret = 12;
    request.body.grant_type = "password";

    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
      server
        .token(request, response)
        .then((token) => {
          res.send(token);
        })
        .catch((err) => {
          console.log(err);
          err.statusCode
            ? res.status(err.statusCode).json(err)
            : res.send(err).status(400);
        });
    } else {
      res.json({ message: "please enter username and password" });
    }
  } else {
    let token: any = req.headers.authorization.split(" ") || "";
    if (token[1]) {
      server
        .authenticate(request, response)
        .then((token) => {
          // return res.send(token);
          next();
        })
        .catch((err) => {
          return err.statusCode
            ? res.status(err.statusCode).json(err)
            : res.send(err).status(400);
        });
    }
    // jsonwebtoken.verify(
    //   token[1],
    //   "accessTokenSecret",
    //   // { algorithms: ["HS256"] },
    //   (err, decodedToken) => {
    //     if (err) throw err;
    //   }
    // );
  }
}
