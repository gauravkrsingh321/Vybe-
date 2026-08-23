import uploadToCloudinary from "../config/cloudinary.js";
import Reel from "../models/reel.model.js";
import { User } from "../models/user.model.js";

export const uploadReel = async (req, res) => {
  try {
    const { caption, mediaType } = req.body;
    if (!mediaType) {
      return res.status(400).json({
        success: false,
        message: "mediaType is required",
      });
    }
    let media;
    if (req.file) {
      media = await uploadToCloudinary(req.file.path);
      media = media.secure_url;
    } else {
      return res.status(400).json({
        success: false,
        message: "Media is required",
      });
    }
    const reel = await Reel.create({
      caption,
      media,
      mediaType,
      author: req.userId,
    });
    const user = await User.findById(req.userId);
    user.reels.push(reel._id);
    await user.save();
    const populatedReel = await Reel.findById(reel._id).populate(
      "author",
      "name username profilePic",
    );
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
};

export const getAllReels = async (req, res) => {
  try {
    const allReels = await Reel.find({})
      .populate("author", "name username profilePic")
      .populate("comments.author");
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
};

export const likeReel = async (req, res) => {
  try {
    const reelId = req.params.reelId;
    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(400).json({
        success: false,
        message: "Reel not found",
      });
    }

    const alreadyLiked = reel.likes.some(
      (id) => id.toString() === req.userId.toString(),
    );

    if (alreadyLiked) {
      reel.likes = reel.likes.filter(
        (id) => id.toString() !== req.userId.toString(),
      );
    } else {
      reel.likes.push(req.userId);
      if (reel.author._id != req.userId) {
        const notification = await Notification.create({
          sender: req.userId,
          receiver: reel.author._id,
          type: "like",
          reel: reel._id,
          message: "liked your reel",
        });

        const populatedNotification = await Notification.findById(
          notification._id,
        ).populate("sender receiver reel");

        const receiverSocketId = getSocketId(reel.author._id);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit(
            "newNotification",
            populatedNotification,
          );
        }
      }
    }
    await reel.save();
    await reel.populate("author", "name username profilePic");
    io.emit("likedReel", {
      reelId: reel._id,
      likes: reel.likes,
    });
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
};

export const commentOnReel = async (req, res) => {
  try {
    const { message } = req.body;
    const reelId = req.params.reelId;
    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(400).json({
        success: false,
        message: "Reel not found",
      });
    }
    reel.comments.push({
      author: req.userId,
      message,
    });
    if (reel.author._id != req.userId) {
      const notification = await Notification.create({
        sender: req.userId,
        receiver: reel.author._id,
        type: "comment",
        reel: reel._id,
        message: "commented on your reel",
      });

      const populatedNotification = await Notification.findById(
        notification._id,
      ).populate("sender receiver reel");

      const receiverSocketId = getSocketId(reel.author._id);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newNotification", populatedNotification);
      }
    }
    await reel.save();
    await reel.populate("author", "name username profilePic");
    await reel.populate("comments.author");

    io.emit("commentedOnReel", {
      reelId: reel._id,
      comments: reel.comments,
    });
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
};
