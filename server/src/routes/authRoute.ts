import express from "express";
import AuthController from "../controllers/authController";

const authController = new AuthController();

const router = express.Router();

router.post("/create", authController.create);

router.post("/activate", authController.activateUser);

router.post("/login", authController.login);

router.post("/refresh", authController.handleRefreshToken);

router.post("/logout", authController.logout);

router.post("/user/email", authController.getEmail);

router.get("/google/oauth2callback", authController.googleOAuth);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export default router;
