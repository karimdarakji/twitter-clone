import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import {
  cookieConfig,
  setAccessToken,
  setRefreshToken,
} from "../../utils/authenticate.js";

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  console.log(cookies);
  // if cookie with name jwt is not found
  if (!cookies.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", cookieConfig);

  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
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
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
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

export default handleRefreshToken;
