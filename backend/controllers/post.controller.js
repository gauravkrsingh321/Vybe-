import uploadToCloudinary from "../config/cloudinary.js";
import { User } from "../models/user.model.js";
import Post from "../models/post.model.js"

export const uploadPost = async (req,res) => {
  try {
    const {caption,mediaType} = req.body;
    let media;
    if(req.file) {
      media = await uploadToCloudinary(req.file.path);
    } else {
      return res.status(400).json({
        success: false,
        message: "Media is required",
      });
    }
    const post = await User.create({caption,media,mediaType,author:req.userId});
    const user = await User.findById(req.userId);
    user.posts.push(post._id)
    await user.save()
    const populatedPost = await User.findById(post._id).populate("author","name username profilePic");
    return res.status(200).json({
      success: true,
      populatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getAllPosts = async (req,res) => {
  try {
    const allPosts = await Post.find({}).populate("author","name username profilePic");
    return res.status(200).json({
      success: true,
      allPosts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const likePost = async (req,res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if(!post) {
      return res.status(400).json({
      success: false,
      message:"Post not found",
    });
    }

    const alreadyLiked = post.likes.some(id=>id.toString()===req.userId.toString());

    if(alreadyLiked) {
      post.likes = post.likes.filter(id=>id.toString()!==req.userId.toString());
    }  
    else {
      post.likes.push(req.userId);
    }
    await post.save();
    post.populate("author","name username profilePic");
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const commentOnPost = async (req,res) => {
  try {
    const {message} = req.body;
    const postId = req.params.postId;
    const post =  await Post.findById(postId);
     if(!post) {
      return res.status(400).json({
      success: false,
      message:"Post not found",
    });
    }
    post.comments.push({
      author:req.userId,
      message
    })
    await post.save();
    post.populate("author","name username profilePic");
    post.populate("comments.author");
    return res.status(200).json({
      success: true,
      post,
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const savePost = async (req,res)=>{
   try {
    const postId = req.params.postId;
    const user = await User.findById(req.userId);
    if(!user) {
      return res.status(400).json({
      success: false,
      message:"User not found",
    });
    }

    const alreadySaved = user.saved.some(id=>id.toString()===postId.toString());

    if(alreadySaved) {
      user.saved = user.saved.filter(id=>id.toString()!==postId.toString());
    }  
    else {
      user.saved.push(postId);
    }
    await user.save();
    user.populate("saved");
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
}