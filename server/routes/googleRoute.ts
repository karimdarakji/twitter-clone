import express from "express";
import User from "../models/User";
import { OAuth2Client } from "google-auth-library";
import { AuthService } from "../services/authService";
import { cookieConfig } from "../utils/authenticate";
const router = express.Router();
const authService = new AuthService();

router.get("/oauth2callback", async (req, res) => {
  const { code, state } = req.query as { code: string; state: string };

  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  });

  // Exchange the authorization code for access and refresh tokens
  const { tokens } = await client.getToken(code);
  if (tokens?.access_token) {
    const { email } = await client.getTokenInfo(tokens.access_token);
    const user = await User.findOne({ email });
    if (!user) {
      if (state === "signup") {
        return res.send(
          "<p>Sorry you have to sign up first!</p><br/><a href='http://localhost:3000'>Go back</a>"
        );
      }
      await User.create({
        email,
      });
    }
    // Use AuthService to validate the login
    const loginResult = await authService.validateLogin(
      email as string,
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

  // Handle the tokens (store them, associate them with a user, etc.)
});

export default router;
