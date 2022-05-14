import User from "../models/User.js";
import AccountsActivation from "../models/accountsActivation.js";

import { sendMail, signupTemplate } from "../helpers/sendgrid.js";

import JoiBase from "joi";
import JoiDate from "@joi/date";
import bcrypt from "bcrypt";
import crypto from "crypto";

const Joi = JoiBase.extend(JoiDate);

export const createUser = async (req, res) => {
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
          await sendMail.send(
            signupTemplate({
              name: register.name,
              email: register.email,
              activationCode: token,
            })
          );
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
    res.status(500).send(error.message);
  }
};

export const secregisterUser = async (req, res) => {
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
      await sendMail.send(
        signupTemplate({
          name: getUserByMail.name,
          email: getUserByMail.email,
          activationCode: token,
        })
      );
      delete getUserByMail.password;
      return res.status(200).json(getUserByMail);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const activateUser = async (req, res) => {
  const { user_id, token } = req.body;

  try {
    // check token
    const checkToken = await AccountsActivation.findOne({ user_id: user_id });

    if (!checkToken) return res.status(404).send("User not found");

    if (checkToken.token === token) {
      // set user to active
      await User.findById(checkToken.user_id, function (error, userInfo) {
        if (userInfo.active === 1) {
          return res.status(404).send("Account already activated");
        } else {
          userInfo.active = 1;
          userInfo.save();
          delete userInfo.password;
          return res.status(200).json(userInfo);
        }
      });
      await AccountsActivation.findOneAndDelete({
        user_id: user_id,
      });
    } else {
      return res
        .status(404)
        .send("Sorry, your account can't be activated at the moment!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
