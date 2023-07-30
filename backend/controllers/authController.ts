import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JoiBase from "joi";
import JoiDate from "@joi/date";
import crypto from "crypto";

import {
  cookieConfig,
  setAccessToken,
  setRefreshToken,
} from "../utils/authenticate";
import AccountsActivation from "../models/accountsActivation";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const currentRefreshToken = req.cookies?.jwt;
    // Use AuthService to validate the login
    const loginResult = await AuthService.validateLogin(
      usernameOrEmail,
      password,
      currentRefreshToken
    );

    // If login fails, AuthService should throw an error which is caught and passed to next(error)
    const { accessToken, refreshToken } = loginResult;

    // Clear old cookie and set a new one
    res.clearCookie("jwt", cookieConfig);
    res.cookie("jwt", refreshToken, cookieConfig);

    // Respond with access token
    res.json({ accessToken });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
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
        }).exec();
        hackedUser.refreshToken = [];
        await hackedUser.save();
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

const Joi = JoiBase.extend(JoiDate);

export const handleFirstRegistrationProcess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required(),
    birthDate: Joi.date().format("YYYY-MM-DD").required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user = req.body;
  const newUser = new User(user);

  try {
    const register = await User.findOne({ email: user.email });
    // if user registers for first time
    if (!register) {
      newUser.save();
      return res.status(200).json(newUser);
    }

    if (register) {
      // if user has completed all registration processes and activated his account else if he is not yet active
      if (register.username) {
        if (register.active === 1) {
          return res.status(404).send("Account already created");
        } else {
          // create token
          const token =
            crypto.randomBytes(48).toString("hex") + "-X-X-" + register._id;
          // overwrite the token in accountActivation model
          await AccountsActivation.findByIdAndUpdate(register._id, {
            token: token,
          });
          // send activation email to user
          // await sendMail.send(
          //   signupTemplate({
          //     name: register.name,
          //     email: register.email,
          //     activationCode: token,
          //   })
          // );
          return res.status(200).json({
            code: "activation",
            message: "Another activation code has been sent to your email!",
          });
        }
      }
      // if user has completed his first registration process
      const overwriteUserFields = register;
      overwriteUserFields.name = user.name;
      overwriteUserFields.email = user.email;
      overwriteUserFields.birthDate = user.birthDate;
      overwriteUserFields.save();
      return res.status(200).send(overwriteUserFields);
    }
  } catch (error) {
    next(error);
  }
};

export const handleSecondRegistrationProcess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.send(error.details[0].message);
  const userFromBody = req.body;

  try {
    // check if username is taken from another user
    const checkUsernameIfTaken = await User.findOne({
      username: userFromBody.username,
    });
    if (checkUsernameIfTaken)
      return res.status(404).send("Username already taken");

    // get user by email and update his fields
    const getUserByMail = await User.findOne({
      email: userFromBody.email,
    });
    if (!getUserByMail) {
      return res.status(404).send("User not found");
    } else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(userFromBody.password, salt);

      // update user info
      getUserByMail.username = userFromBody.username;
      getUserByMail.password = password;
      getUserByMail.image = "";
      getUserByMail.save();

      // fill user id and token in collection
      const token =
        crypto.randomBytes(48).toString("hex") + "-X-X-" + getUserByMail._id;
      const sendActivationToken = await AccountsActivation.findOne({
        user_id: getUserByMail._id,
      });
      if (sendActivationToken) {
        sendActivationToken.token = token;
        sendActivationToken.updatedAt = new Date();
        sendActivationToken.save();
      } else {
        const userActivationFields = new AccountsActivation({
          user_id: getUserByMail._id,
          token: token,
        });
        userActivationFields.save();
      }
      // await sendMail.send(
      //   signupTemplate({
      //     name: getUserByMail.name,
      //     email: getUserByMail.email,
      //     activationCode: token,
      //   })
      // );
      delete getUserByMail.password;
      return res.status(200).json(getUserByMail);
    }
  } catch (error) {
    next(error);
  }
};

export const handleUserActivation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id, token } = req.body;

  try {
    // check token
    const checkToken = await AccountsActivation.findOne({ user_id: user_id });

    if (!checkToken) return res.status(404).send("User not found");

    if (checkToken.token === token) {
      // set user to active
      const userInfo = await User.findById(checkToken.user_id);
      if (userInfo.active === 1) {
        return res.status(404).send("Account already activated");
      } else {
        userInfo.active = 1;
        userInfo.save();
        delete userInfo.password;
      }
      await AccountsActivation.findOneAndDelete({
        user_id: user_id,
      });
      return res.status(200).json(userInfo);
    } else {
      return res
        .status(404)
        .send("Sorry, your account can't be activated at the moment!");
    }
  } catch (error) {
    next(error);
  }
};
