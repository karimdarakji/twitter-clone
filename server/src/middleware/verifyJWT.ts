import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const accessToken = req.cookies?.jwt;
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET ?? "",
    (err: any, decoded: any) => {
      console.log(err);
      if (err) return res.sendStatus(403); //invalid token
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
      };
      next();
    }
  );
};
