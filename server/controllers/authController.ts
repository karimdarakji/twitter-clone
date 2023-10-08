import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JoiBase from "joi";
import JoiDate from "@joi/date";
import crypto from "crypto";
const Joi = JoiBase.extend(JoiDate);

import {
  cookieConfig,
  setAccessToken,
  setRefreshToken,
} from "../utils/authenticate";
import AccountsActivation from "../models/UserActivation";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import UserActivationService from "../services/userActivationService";
import AuthService from "../services/authService";
import { OAuth2Client } from "google-auth-library";
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "../utils/errors";
import Mailer from "../utils/nodemailer";
const mailer = new Mailer();

export default class AuthController {
  private authService;
  private userActivationService;
  constructor() {
    this.authService = new AuthService();
    this.userActivationService = new UserActivationService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().required(),
      birthDate: Joi.date().format("YYYY-MM-DD").required(),
      username: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return new ValidationError(error.details[0].message);

    const userFromBody = {
      ...req.body,
      image: "",
    };

    try {
      // check if username is taken from another user
      const user = await this.authService.findOne({
        username: userFromBody.username,
      });
      if (user?.username && user?.active) {
        return new ForbiddenError("Username already taken");
      }

      if (user?.email && user?.active) {
        return new ForbiddenError("Email already taken");
      }

      // check password and return activation code if user is not active
      if (user && !user?.active) {
        const isPasswordCorrect = await bcrypt.compare(
          userFromBody.password,
          user.password as string
        );
        if (isPasswordCorrect) {
          const token =
            crypto.randomBytes(48).toString("hex") + "-X-X-" + user._id;
          await this.userActivationService.findOneAndUpdate(
            { userId: user._id as string },
            {
              token,
            },
            { upsert: true }
          );
          await mailer.userActivationMailTemplate({
            name: user.name,
            email: user.email,
            activationCode: token,
          });
          delete userFromBody.password;
          return res.status(200).json(userFromBody);
        }
        throw new NotFoundError("Incorrect credentials");
      }
      // hash password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(userFromBody.password, salt);

      // update user info
      userFromBody.password = password;
      const newUser = await this.authService.create(userFromBody);

      const token =
        crypto.randomBytes(48).toString("hex") + "-X-X-" + newUser._id;
      await this.userActivationService.create({
        userId: newUser._id,
        token,
      });
      await mailer.userActivationMailTemplate({
        name: newUser.name,
        email: newUser.email,
        activationCode: token,
      });
      delete newUser.password;
      return res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  googleOAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { code, state } = req.query as { code: string; state: string };

    const client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    });

    // Exchange the authorization code for access and refresh tokens
    const { tokens } = await client.getToken(code);
    if (tokens?.access_token) {
      const userInfo = await client.getTokenInfo(tokens.access_token);
      const user = await this.authService.findOne({ email: userInfo.email });
      if (!user) {
        if (state === "signin") {
          return res.send(
            "<p>Sorry you have to sign up first!</p><br/><a href='http://localhost:3000'>Go back</a>"
          );
        }
        const ticket = await client.verifyIdToken({
          idToken: tokens.id_token as string,
        });
        const payload = ticket.getPayload();
        await this.authService.create({
          name: payload?.name,
          email: payload?.email,
          username: payload?.email,
          image: payload?.picture,
          password: "",
          active: 1,
        });
      }
      // Use AuthService to validate the login
      const loginResult = await this.authService.validateLogin(
        userInfo.email as string,
        "",
        "",
        true
      );
      // If login fails, AuthService should throw an error which is caught and passed to next(error)
      const { refreshToken } = loginResult;

      // Clear old cookie and set a new one
      res.clearCookie("jwt", cookieConfig);
      res.cookie("jwt", refreshToken, cookieConfig);

      // Respond with access token
      return res.redirect("http://localhost:3000/home");
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { emailorUsername, password } = req.body;
      const currentRefreshToken = req.cookies?.jwt;
      // Use AuthService to validate the login
      const loginResult = await this.authService.validateLogin(
        emailorUsername,
        password,
        currentRefreshToken
      );

      // If login fails, AuthService should throw an error which is caught and passed to next(error)
      const { accessToken, refreshToken } = loginResult;

      // Clear old cookie and set a new one
      res.clearCookie("jwt", cookieConfig);
      res.cookie("jwt", refreshToken, cookieConfig);

      // Respond with access token
      res.status(200).json({ accessToken });
    } catch (error: any) {
      next(error);
    }
  };

  activateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, token } = req.body;

    try {
      // check token
      const checkToken = await this.userActivationService.findOne({ userId });

      if (!checkToken) {
        throw new NotFoundError("User not found");
      }

      if (checkToken.token === token) {
        // set user to active
        const userInfo = await this.authService.findById(checkToken.userId);
        if (userInfo) {
          if (userInfo.active === 1) {
            return new ForbiddenError("Account already activated!");
          }
          await this.authService.findByIdAndUpdate(userInfo._id, { active: 1 });
        }
        await this.userActivationService.findOneAndDelete({
          userId,
        });
        return res.status(200).json("success");
      }
      return res
        .status(404)
        .send("Sorry, your account can't be activated at the moment!");
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No Content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", cookieConfig);
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(
      (rt: string) => rt !== refreshToken
    );
    await foundUser.save();

    res.clearCookie("jwt", cookieConfig);
    res.sendStatus(204);
  };

  getEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const user = await this.authService.findOne({ email });
      if (user && user.active) {
        return res.status(404).send("Email already in use");
      }
      return res.status(200).send({ email });
    } catch (error) {
      next(error);
    }
  };
}

export const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  // if cookie with name jwt is not found
  if (!cookies.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", cookieConfig);

  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET ?? "",
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403); //Forbidden
        const hackedUser = await User.findOne({
          username: decoded.username,
        });
        if (hackedUser) {
          hackedUser.refreshToken = [];
          await hackedUser.save();
        }
        return res.sendStatus(403); //Forbidden
      }
    );
    return;
  }

  // remove refresh token from array in mongodb
  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt: string) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET ?? "",
    async (err: any, decoded: any) => {
      if (err) {
        foundUser.refreshToken = [...refreshToken];
        await foundUser.save();
      }
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);

      // Refresh token was still valid
      const accessToken = setAccessToken(decoded.username);

      const newRefreshToken = setRefreshToken(foundUser.username);

      // save refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      // Creates Secure Cookie with refresh Token
      res.cookie("jwt", newRefreshToken, cookieConfig);
      res.json({ accessToken });
    }
  );
};
