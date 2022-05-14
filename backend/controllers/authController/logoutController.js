import User from "../../models/User.js";
import { cookieConfig } from "../../utils/authenticate.js";

const handleLogout = async (req, res) => {
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
    (rt) => rt !== refreshToken
  );
  await foundUser.save();

  res.clearCookie("jwt", cookieConfig);
  res.sendStatus(204);
};

export default handleLogout;
