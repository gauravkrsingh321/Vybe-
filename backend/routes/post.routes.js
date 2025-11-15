import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, getCurrentUser, getProfile, suggestedUsers } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { commentOnPost, getAllPosts, likePost, savePost, uploadPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/uploadPost",isAuth,upload.single("media"),uploadPost);
router.get("/allPosts",isAuth,getAllPosts);
router.get("/like/:postId",isAuth,likePost);
router.get("/saved/:postId",isAuth,savePost);
router.post("/postComment",isAuth,commentOnPost)

export default router