import express from "express";

import {
  createUser,
  secregisterUser,
  activateUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/me", (req, res, next) => {
  res.send(req.user);
});

/*-- register user first step --*/
router.post("/create", createUser);
/*-- register user second step --*/
router.post("/update", secregisterUser);
/*-- activate user --*/
router.post("/activate", activateUser);

export default router;
