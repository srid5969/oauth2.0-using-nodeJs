import { NextFunction, Request, Response } from "express";
import oauth2Server, {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from "oauth2-server";
import { option } from "./oauth20.library";

export default function Oauth20Middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const request = new OAuthRequest(req);
  const response = new OAuthResponse(res);
  request.headers["content-type"] = "application/x-www-form-urlencoded";

  const server = new oauth2Server({
    model: option,
    accessTokenLifetime: 60,
    allowExtendedTokenAttributes: true,
  });

  switch (req.originalUrl) {
    case "/token/auth":
      /**
     
     To Generate Access Token Using Refresh Token 
    @param refreshToken
    @returns  @param   {
      refreshToken,
      accessToken,
    }
    */
      server
        .token(request, response)
        .then((token) => {
          console.log(token.user);
          
          res.send({
            refreshToken: token.refreshToken,
            accessToken: token.accessToken,
          });
        })
        .catch((err) => {
          console.log(err);
          err.statusCode
            ? res.status(err.statusCode).json(err)
            : res.send(err).status(400);
        });

      break;
    case "/user/login":
      /**
       * Get params username a
        @param {username,  password, client_id, client_secret, grant_type}
          @returns    @field
                               {
                                 refreshToken,
                                 accessToken,
                                 user
                               }
       */
      let username = req.body.username;
      let password = req.body.password;
      if (username && password) {
        server
          .token(request, response)
          .then((token) => {
            res.json({
              accessToken: token.accessToken,
              refreshToken: token.refreshToken,
              user: token.user,
            });
          })
          .catch((err) => {
            err.statusCode
              ? res.status(err.statusCode).json(err)
              : res.send(err).status(400);
          });
      } else {
        res.json({ message: "please enter username and password" });
      }
      break;
    default:
      if (!req.headers.authorization) {
        res.status(404).json({ message: "Token Not Found" });
        break;
      }
      
      let token: any = req.headers.authorization.split(" ") || "";
      if (token[1]) {
        server
          .authenticate(request, response)
          .then((token) => {
            console.log(token);
            next();
          })
          .catch((err) => {
            console.error(err);

             err.statusCode
              ? res.status(err.statusCode).json(err)
              : res.send(err).status(400);
          });
      }else{
        res.status(404).json({ message: "Bearer Token Not Found" });
      }
      break;
  }
}
