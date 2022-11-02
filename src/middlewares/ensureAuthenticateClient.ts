import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayloud {
    sub: string;
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        return response.status(401).json({
            message: "Token missing",
        });
    }

    // Bearer
    //[0] - Bearer
    //[1] - tokennnsina
    const [, token ] = authHeader.split(" ")

    try {
       const { sub }= verify(token,"6fbc10faa450d8834cc8c7aeda4736c8") as IPayloud;
      // console.log(sub);
      request.id_client = sub;

      return next();

    }catch(err){
        return response.status(401).json({
            message: "Invalid token!",
        });
    }
    
}