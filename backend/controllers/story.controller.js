import uploadToCloudinary from "../config/cloudinary.js";
import Story from "../models/story.model.js";
import { User } from "../models/user.model.js";

export const uploadStory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if(user.story) {
      //previous story
      await Story.findByIdAndDelete(user.story);
      user.story = null;
    }
    const { mediaType } = req.body;
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
    const story = await Story.create({ author: req.userId, media, mediaType });
    // console.log("Story",story)
    user.story = story._id;
    // console.log(user.story)
    await user.save();
    const populatedStory = await Story.findById(story._id)
      .populate("author", "name username profilePic")
      .populate("viewers", "name username profilePic");
    return res.status(200).json({
      success: true,
      populatedStory,
    });  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const viewStory = async (req,res) => {
  try {
    const storyId = req.params.storyId;
    const story  = await Story.findById(storyId);
    if(!story) {
        return res.status(400).json({
        success: false,
        message:"Story not found",
      });
    }
    const viewersIds = story.viewers.map(id=>id.toString());
    if(!viewersIds.includes(req.userId)) {
      story.viewers.push(req.userId)
      await story.save()
    } 
    const populatedStory = await Story.findById(story._id)
        .populate("author", "name username profilePic")
        .populate("viewers", "name username profilePic");
    return res.status(200).json({
        success: true,
        populatedStory,
      }); 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }    
}

export const getStoryByUsername = async(req,res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({username})
   if(!user) {
        return res.status(404).json({
        success: false,
        message:"User not found",
      });
    }
    const story = await Story.find({author:user._id}).populate("viewers author");
    return res.status(200).json({
        success: true,
        story,
      }); 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


//Get All Stories of all the people in current user following list
export const getAllStories = async(req,res)=>{
  try {
    const currentUser = await User.findById(req.userId);
    if(!currentUser) {
        return res.status(404).json({
        success: false,
        message:"User not found",
      });
    }
    const followingIds = currentUser.following;

    //find stories where author id is stored in followingIds array
    const stories = await Story.find({
      author: {$in:followingIds}
    }).populate("viewers author").sort({createdAt:-1});

    return res.status(200).json({
        success: true,
        stories,
      }); 
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}