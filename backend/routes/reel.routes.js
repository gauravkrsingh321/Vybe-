import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, getCurrentUser, getProfile, suggestedUsers } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { commentOnPost, getAllPosts, likePost, savePost, uploadPost } from "../controllers/post.controller.js";
import { commentOnReel, getAllReels, likeReel, uploadReel } from "../controllers/reel.controller.js";

const router = express.Router();

router.post("/uploadReel",isAuth,upload.single("media"),uploadReel);
router.get("/allReels",isAuth,getAllReels);
router.get("/like/:reelId",isAuth,likeReel);
router.post("/reelComment",isAuth,commentOnReel)

export default router