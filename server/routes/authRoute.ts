import express from "express";
import AuthController, {
  handleRefreshToken,
} from "../controllers/authController";

const authController = new AuthController();

const router = express.Router();

router.post("/create", authController.create);

router.post("/activate", authController.activateUser);

router.post("/login", authController.login);

router.post("/refresh", handleRefreshToken);

router.post("/logout", authController.logout);

router.post("/user/email", authController.getEmail);

router.get("/google/oauth2callback", authController.googleOAuth);

export default router;
