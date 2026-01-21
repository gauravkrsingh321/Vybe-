import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { commentOnReel, getAllReels, likeReel, uploadReel } from "../controllers/reel.controller.js";

const router = express.Router();

router.post("/uploadReel",isAuth,upload.single("media"),uploadReel);
router.get("/allReels",isAuth,getAllReels);
router.get("/like/:reelId",isAuth,likeReel);
router.post("/reelComment",isAuth,commentOnReel)

export default router