import { CookieOptions } from "express";
import jwt from "jsonwebtoken";

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  domain: process.env.FRONTEND_URL,
  secure: true,
  maxAge: 5 * 24 * 60 * 60 * 1000,
};

export const setAccessToken = (userId: string, username: string) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    process.env.ACCESS_TOKEN_SECRET ?? "",
    { expiresIn: "15m" }
  );
};

export const setRefreshToken = (userId: string, username: string) => {
  return jwt.sign(
    { userId, username },
    process.env.REFRESH_TOKEN_SECRET ?? "",
    {
      expiresIn: "5d",
    }
  );
};

export const decodeJwt = (token: string): any => {
  return jwt.decode(token);
};
