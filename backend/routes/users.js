import express from "express";
import jwt from "jsonwebtoken";

import {
  createUser,
  secregisterUser,
  Logout,
  activateUser,
  Login,
} from "../controllers/usersController.js";

import User from "../models/User.js";

import {
  getToken,
  getRefreshToken,
  COOKIE_OPTIONS,
  verifyUser,
} from "../authenticate.js";

/*-- function to encode user info --*/
import crypto from "crypto";
import { Buffer } from "buffer";
const key = Buffer.from(process.env.EN_KEY, "base64");

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv("AES-128-CBC", key, iv);
  let encrypted = cipher.update(JSON.stringify(text));
  encrypted = Buffer.concat([iv, encrypted, cipher.final()]);
  return encrypted.toString("hex");
}
/*---------------------------------*/

const router = express.Router();

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});

/*-- register user first step --*/
router.post("/create", createUser);
/*-- register user second step --*/
router.post("/update", secregisterUser);
/*-- activate user --*/
router.post("/activate", activateUser);

/*-- refresh token api --*/
// router.post("/refreshToken", (req, res, next) => {
//   /*-- retrieve refresh token from signed cookies --*/
//   const { signedCookies = {} } = req;
//   const { refreshToken } = signedCookies;

//   if (refreshToken) {
//     try {
//       /*-- we verify the refresh token against the secret used to create the token and extract payload--*/
//       const payload = jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET
//       );
//       const userId = payload._id;

//       User.findOne({ _id: userId }).then(
//         user => {
//           if (user) {
//             // Find the refresh token against the user record in database
//             const tokenIndex = user.refreshToken.findIndex(
//               item => item.refreshToken === refreshToken
//             );

//             if (tokenIndex === -1) {
//               res.statusCode = 401;
//               res.send("Unauthorized, token not found");
//             } else {
//               const token = getToken({ _id: userId });
//               // If the refresh token exists, then create new one and replace it.
//               const newRefreshToken = getRefreshToken({ _id: userId });
//               user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };

//               user.save((err, user) => {
//                 if (err) {
//                   res.statusCode = 500;
//                   res.send(err);
//                 } else {
//                   const userInfo = user.toObject();
//                   delete userInfo.password;
//                   Object.assign(userInfo, { token: token });
//                   const data = encrypt(userInfo);
//                   res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
//                   res.send({ success: true, data });
//                 }
//               });
//             }
//           } else {
//             res.statusCode = 401;
//             res.send("Unauthorized, user not found");
//           }
//         },
//         err => next(err)
//       );
//     } catch (err) {
//       res.statusCode = 401;
//       res.send("Unauthorized," + err);
//     }
//   }
// });

/*-- logout user --*/
router.get("/logout", verifyUser, Logout);

export default router;
