import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  cookieConfig,
  setAccessToken,
  setRefreshToken,
} from "../../utils/authenticate.js";

const handleLogin = async (req, res) => {
  const cookies = req.cookies;

  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  try {
    // check if user is available, active and has entered the correct credentials
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      res.status(404).send({ message: "Incorrect username or password" });
    }
    const checkPassword = await bcrypt.compare(password, foundUser?.password);
    if (checkPassword) {
      // create JWTs
      const accessToken = setAccessToken(foundUser.username);
      const newRefreshToken = setRefreshToken(foundUser.username);

      let newRefreshTokenArray = !cookies?.jwt
        ? foundUser.refreshToken
        : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

      if (cookies?.jwt) {
        /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken }).exec();

        // Detected refresh token reuse!
        if (!foundToken) {
          newRefreshTokenArray = [];
        }
        res.clearCookie("jwt", cookieConfig);
      }

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, cookieConfig);

      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handleLogin;
