import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { decodeJwt } from "../utils/authenticate";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies?.jwt;
    const decodedAccessToken = decodeJwt(accessToken);
    const user = await User.findOne({ username: decodedAccessToken?.username });
    if (user) {
      return res.status(200).send({
        username: user.username,
        email: user.email,
        image: user.image,
        name: user.name,
      });
    }
    return res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};
