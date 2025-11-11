import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      //cloudinary image url
      type: String,
    },
    bio: {
      type: String,
    },
    profession: {
      type: String,
    },
    gender: {
      type: String,
      enum:["male","female"]
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
     following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    reels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],
    stories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    resetOTP: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isOTPVerified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
