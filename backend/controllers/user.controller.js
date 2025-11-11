import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import uploadToCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req,res)=>{
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if(!user) {
      return res.status(400).json({
      success: false,
      message: "User not found"
    });
    }
    return res.status(200).json({
      success: true,
      message: "User Fetched Out Successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const suggestedUsers = async (req,res) => {
  try {
    const users = await User.find({
      _id:{$ne:req.userId}
    }).select("-password");
    if(!users) {
       return res.status(400).json({
      success: false,
      message: "Users not found"
    });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched Suggested Users Successfully",
      users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const editProfile = async (req,res) => {
  try {
    const {name,username,bio,profession,gender} = req.body;
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if(!user) {
       return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }
    const sameUserWithUsername = await User.findOne({username}).select("-password");
    if(sameUserWithUsername && sameUserWithUsername._id != userId) {
       return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }
  
    let profilePic;
    if(req.file) {
      profilePic = await uploadToCloudinary(req.file.path);
    }
  
    user.name=name;
    user.username=username;
    user.profilePic=profilePic;
    user.bio=bio;
    user.profession=profession;
    user.gender=gender;
    await user.save();

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }

} 

export const getProfile = async (req,res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({username}).select("-password");
    if(!user) {
       return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}