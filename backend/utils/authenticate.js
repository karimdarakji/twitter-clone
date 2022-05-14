import jwt from "jsonwebtoken";

export const cookieConfig = {
  httpOnly: true,
  sameSite: "None",
  origin: process.env.FRONTEND_URL,
  secure: true,
  maxAge: 5 * 24 * 60 * 60 * 1000,
};

export const setAccessToken = (username) => {
  return jwt.sign(
    {
      UserInfo: {
        username: username,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

export const setRefreshToken = (username) => {
  return jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5d",
  });
};
