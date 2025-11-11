import express from "express"
import { login, logout, resetPasssword, sendOTP, signup, verifyOTP } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/sendOtp",sendOTP);
router.post("/verifyOtp",verifyOTP);
router.post("/resetPassword",resetPasssword);
router.post("/logout",logout);

export default router