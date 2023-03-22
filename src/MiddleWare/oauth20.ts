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
  const server = new oauth2Server({
    model: model,
    accessTokenLifetime: 3600,
    allowExtendedTokenAttributes: true,
    //   debug: true
  });
  if (req.originalUrl === "/user/login") {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
      server
        .token(request, response)
        .then((token) => {
          console.log(token);
          res.send(token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({ message: "please enter username and password" });
    }
  } else {
    // console.log(req.headers.authorization);

    let token: any = req.headers.authorization.split(" ") || "";
    console.log(token[1]);
    server
      .authenticate(request, response)
      .then((token) => {
        console.log(token);
        res.send(token);
      })
      .catch((err) => {
        res.send(err);

        console.log(err);
      });
    // jsonwebtoken.verify(
    //   token[1],
    //   "accessTokenSecret",
    //   // { algorithms: ["HS256"] },
    //   (err, decodedToken) => {
    //     if (err) throw err;
    //     console.log(decodedToken); // this is your decoded JWT with user details
    //   }
    // );
  }
}
