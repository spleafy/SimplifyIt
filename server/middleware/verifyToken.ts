import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// Models
import ResponseMessage from "../models/responseMessage";
import ResponseError from "../models/responseError";

const verifyToken = (req: Request | any, res: Response, next: NextFunction) => {
  if (!req.headers) {
    res.status(401).json(ResponseError.token());
    return;
  }

  const token: string = req.headers["x-auth-token"] as string;

  if (!token) {
    res.status(401).json(ResponseError.token());
    return;
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, data: any) => {
      if (err) {
        res.status(401).json(new ResponseError(401, "Token is invalid!"));
      } else {
        req.id = data.id;
        req.code = data.code;
        next();
      }
    }
  );
};

export default verifyToken;
