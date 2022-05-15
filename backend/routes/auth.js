import express from "express";
import {
  handleLogin,
  handleRefreshToken,
  handleLogout,
  handleFirstRegistrationProcess,
  handleSecondRegistrationProcess,
  handleUserActivation,
} from "../controllers/authController/index.js";

const router = express.Router();

router.post("/register", handleFirstRegistrationProcess);
router.post("/secregister", handleSecondRegistrationProcess);

router.post("/activate", handleUserActivation);

router.post("/login", handleLogin);

router.post("/refresh", handleRefreshToken);

router.post("/logout", handleLogout);

export default router;
