import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import oauth2Server,{ InvalidRequestError, InvalidTokenError,Request as OAuthRequest,Response as OAuthResponse,PasswordModel} from "oauth2-server";
import {option} from "./oauth20.library";
let model=option

export default function Oauth20Middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.originalUrl === "/user/login") {
    let username=req.body.username;
    let password=req.body.password;
    if(username&&password){
      const request:OAuthRequest = new OAuthRequest(req);
      // const response:OAuthResponse = new OAuthRequest(res);   
        const server  = new oauth2Server({
          model:model,
          accessTokenLifetime: 3600,
          allowExtendedTokenAttributes: true,
        //   debug: true
        });
        
    }
  } else {
    let token: string = req.headers.authorization || "";
    jsonwebtoken.verify(
      token,
      'secretKey',
      { algorithms: ["HS256"] },
      (err, decodedToken) => {
        if (err) throw err;
        console.log(decodedToken); // this is your decoded JWT with user details
      }
    );
  }
}