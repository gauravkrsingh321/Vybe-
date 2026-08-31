import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { editProfile, follow, followingList, getAllNotifications, getCurrentUser, getProfile, markNotificationAsRead, search, suggestedUsers } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/current",isAuth,getCurrentUser);
router.get("/suggested",isAuth,suggestedUsers);
router.get("/getProfile/:username",isAuth,getProfile);
router.get("/follow/:targetUserId",isAuth,follow);
router.get("/followingList",isAuth,followingList);
router.get("/search",isAuth,search);
router.get("/getAllNotifications",isAuth,getAllNotifications);
router.post("/markAsRead",isAuth,markNotificationAsRead);
router.post("/editProfile",isAuth,upload.single("profilePic"),editProfile)

export default router