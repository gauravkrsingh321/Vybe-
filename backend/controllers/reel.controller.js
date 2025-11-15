import uploadToCloudinary from "../config/cloudinary.js";
import Reel from "../models/reel.model.js";
import { User } from "../models/user.model.js";

export const uploadReel = async (req,res) => {
  try {
    const {caption} = req.body;
    let media;
    if(req.file) {
      media = await uploadToCloudinary(req.file.path);
    } else {
      return res.status(400).json({
        success: false,
        message: "Media is required",
      });
    }
    const reel = await Reel.create({caption,media,author:req.userId});
    const user = await User.findById(req.userId);
    user.reels.push(reel._id)
    await user.save()
    const populatedReel = await Reel.findById(reel._id).populate("author","name username profilePic");
    return res.status(200).json({
      success: true,
      populatedReel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getAllReels = async (req,res) => {
  try {
    const allReels = await Reel.find({}).populate("author","name username profilePic").populate("comments.author");
    return res.status(200).json({
      success: true,
      allReels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const likeReel = async (req,res) => {
  try {
    const reeId = req.params.reeId;
    const reel = await Reel.findById(reeId);
    if(!reel) {
      return res.status(400).json({
      success: false,
      message:"Reel not found",
    });
    }

    const alreadyLiked = reel.likes.some(id=>id.toString()===req.userId.toString());

    if(alreadyLiked) {
      reel.likes = reel.likes.filter(id=>id.toString()!==req.userId.toString());
    }  
    else {
      reel.likes.push(req.userId);
    }
    await reel.save();
    reel.populate("author","name username profilePic");
    return res.status(200).json({
      success: true,
      reel,
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const commentOnReel = async (req,res) => {
  try {
    const {message} = req.body;
    const reelId = req.params.reelId;
    const reel =  await Reel.findById(reelId);
     if(!reel) {
      return res.status(400).json({
      success: false,
      message:"Reel not found",
    });
    }
    reel.comments.push({
      author:req.userId,
      message
    })
    await reel.save();
    reel.populate("author","name username profilePic");
    reel.populate("comments.author");
    return res.status(200).json({
      success: true,
      reel,
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
