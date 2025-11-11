import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, getCurrentUser, getProfile, suggestedUsers } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/current",isAuth,getCurrentUser);
router.get("/suggested",isAuth,suggestedUsers);
router.get("/getProfile/:username",isAuth,getProfile);
router.post("/editProfile",isAuth,upload.single("profilePic"),editProfile)

export default router