import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import { authenticateUser } from "../middleWare/authenticateUser";
import { updateUser } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.patch("/updateUser", authenticateUser, updateUser);

export default router;
