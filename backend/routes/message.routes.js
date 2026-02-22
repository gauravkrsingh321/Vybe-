import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { getAllMessages, getPrevUserChats, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:receiverId",isAuth,upload.single("image"),sendMessage);
router.get("/getAll/:receiverId",isAuth,getAllMessages);
router.get("/prevChats",isAuth,getPrevUserChats);


export default router