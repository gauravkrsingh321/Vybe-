import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, getCurrentUser, getProfile, suggestedUsers } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { commentOnPost, getAllPosts, likePost, savePost, uploadPost } from "../controllers/post.controller.js";
import { getStoryByUsername, uploadStory, viewStory } from "../controllers/story.controller.js";

const router = express.Router();

router.post("/uploadStory",isAuth,upload.single("media"),uploadStory);
router.get("/viewStory/:storyId",isAuth,viewStory);
router.get("/getByUsername/:username",isAuth,getStoryByUsername);


export default router