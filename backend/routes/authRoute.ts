import express from "express";
import { handleFirstRegistrationProcess, handleSecondRegistrationProcess, handleUserActivation, handleLogin, handleRefreshToken, handleLogout } from "../controllers/authController";

const router = express.Router();

router.post("/register", handleFirstRegistrationProcess);
router.post("/secregister", handleSecondRegistrationProcess);

router.post("/activate", handleUserActivation);

router.post("/login", handleLogin);

router.post("/refresh", handleRefreshToken);

router.post("/logout", handleLogout);

export default router;
