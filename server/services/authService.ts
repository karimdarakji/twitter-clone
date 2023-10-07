import bcrypt from "bcrypt";
import { setAccessToken, setRefreshToken } from "../utils/authenticate";
import Joi from "joi";
import { ForbiddenError, NotFoundError } from "../utils/errors";
import UserRepository from "../repositories/userRepository";
import Service from "./service";
import { UserDocument } from "../models/User";

const userSchema = Joi.object({
  usernameOrEmail: Joi.string().required(),
});

export default class AuthService extends Service<UserDocument> {
  constructor() {
    super(new UserRepository());
  }
  async validateLogin(
    usernameOrEmail: string,
    password: string,
    currentRefreshToken: string,
    isOAuth: boolean = false
  ) {
    const { error } = userSchema.validate({ usernameOrEmail });

    if (error) {
      throw new NotFoundError(error.details[0].message);
    }
    const foundUser = await this.repository.findOne({ email: usernameOrEmail });
    if (!foundUser) {
      throw new NotFoundError("Incorrect username or password");
    }

    if (!isOAuth) {
      const checkPassword = await bcrypt.compare(
        password,
        foundUser?.password as string
      );
      if (!checkPassword) {
        throw new NotFoundError("Incorrect username or password");
      }

      // check if account is active
      if (!foundUser.active) {
        throw new ForbiddenError("You need to activate your account.");
      }
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
      const foundToken = await this.repository.findOne({
        refreshToken: [currentRefreshToken],
      });

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
