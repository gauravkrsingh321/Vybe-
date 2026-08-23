import { User } from "../models/user.model.js";
import uploadToCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate(
      "posts reels posts.author posts.comments story following",
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Fetched Out Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");
    if (!users) {
      return res.status(400).json({
        success: false,
        message: "Users not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched Suggested Users Successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, username, bio, profession, gender } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const sameUserWithUsername = await User.findOne({ username }).select(
      "-password",
    );
    if (
      sameUserWithUsername &&
      sameUserWithUsername._id.toString() !== userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    let profilePic;
    if (req.file) {
      profilePic = await uploadToCloudinary(req.file.path);
    }

    user.name = name;
    user.username = username;
    // only update if new image selected
    if (profilePic) {
      user.profilePic = profilePic.secure_url;
    }
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;
    await user.save();

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username })
      .select("-password")
      .populate("posts reels followers following");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const follow = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const targetUserId = req.params.targetUserId;
    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: "Target User not found",
      });
    }
    if (currentUserId === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You can not follow yourself",
      });
    }
    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);
    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId,
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId,
      );
      await currentUser.save();
      await targetUser.save();
      return res.status(200).json({
        success: true,
        following: false,
        message: "Unfollowed Successfully",
      });
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
      await currentUser.save();
      await targetUser.save();
      return res.status(200).json({
        success: true,
        message: "Followed Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const followingList = async (req, res) => {
  try {
    const result = await User.findById(req.userId);
    return res.status(200).json({
      success: true,
      followingList: result?.following || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const search = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } },
      ],
    }).select("-password");

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
