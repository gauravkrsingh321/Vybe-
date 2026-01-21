import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { commentOnPost, getAllPosts, likePost, savePost, uploadPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/uploadPost",isAuth,upload.single("media"),uploadPost);
router.get("/allPosts",isAuth,getAllPosts);
router.get("/like/:postId",isAuth,likePost);
router.get("/saved/:postId",isAuth,savePost);
router.post("/postComment/:postId",isAuth,commentOnPost)

export default router