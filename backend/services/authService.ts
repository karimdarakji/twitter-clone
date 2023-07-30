import bcrypt from "bcrypt";
import { setAccessToken, setRefreshToken } from "../utils/authenticate";
import User from "../models/User";
import Joi from "joi";
import { ForbiddenError, NotFoundError } from "../utils/errors";

const userSchema = Joi.object({
  usernameOrEmail: Joi.string().required(),
  password: Joi.string().required(),
});

class AuthService {
  static async validateLogin(
    usernameOrEmail: string,
    password: string,
    currentRefreshToken: string
  ) {
    const { error } = userSchema.validate({ usernameOrEmail, password });

    if (error) {
      throw new NotFoundError(error.details[0].message);
    }
    const foundUser = await User.findOne({ username: usernameOrEmail });
    if (!foundUser) {
      throw new NotFoundError("Incorrect username or password");
    }
    const checkPassword = await bcrypt.compare(password, foundUser?.password);
    if (!checkPassword) {
      throw new NotFoundError("Incorrect username or password");
    }

    // check if account is active
    if (!foundUser.active) {
      throw new ForbiddenError("You need to activate your account.");
    }

    // create JWTs
    const accessToken = setAccessToken(foundUser.username);
    const newRefreshToken = setRefreshToken(foundUser.username);

    // Refresh token logic
    let newRefreshTokenArray = !currentRefreshToken
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter(
          (rt: string) => rt !== currentRefreshToken
        );

    if (currentRefreshToken) {
      const foundToken = await User.findOne({
        refreshToken: currentRefreshToken,
      }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        newRefreshTokenArray = [];
      }
    }

    // Save refresh token with the current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    return {
      user: foundUser,
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export { AuthService };
