import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { getAllStories, getStoryByUsername, uploadStory, viewStory } from "../controllers/story.controller.js";

const router = express.Router();

router.post("/uploadStory",isAuth,upload.single("media"),uploadStory);
router.get("/viewStory/:storyId",isAuth,viewStory);
router.get("/storyByUsername/:username",isAuth,getStoryByUsername);
router.get("/allStories",isAuth,getAllStories);

export default router