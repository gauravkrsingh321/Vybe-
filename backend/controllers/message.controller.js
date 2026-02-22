import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";


export const sendMessage = async (req,res)=>{
  try {
    const senderId = req.userId;
    const {receiverId} = req.params;
    const {message} = req.body;
    let image;
    if(req.file) {
      image = await uploadToCloudinary(req.file.path);
    }
    const newMessage = await Message.create({
      sender:senderId,
      receiver:receiverId,
      message,
      image
    })

    let conversation = await Conversation.findOne({
      participants:{$all:[senderId,receiverId]}
    })
    if(!conversation) {
       conversation = await Conversation.create({
        participants:[senderId,receiverId],
        messages:[newMessage._id]
      })
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save()
    }

    return res.status(200).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getAllMessages = async (req,res) => {
  try {
    const senderId = req.userId;
    const {receiverId} = req.params;
    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,receiverId]}
    }).populate("messages")
    if(!conversation) {
      return res.status(404).json({
      success: false,
      message: "Conversation Not Found",
    });
    }
    return res.status(200).json({
      success: true,
      messages:conversation?.messages
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getPrevUserChats = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const conversations = await Conversation.find({
      participants: currentUserId,
    })
      .populate("participants")
      .sort({ updatedAt: -1 });

    const userMap = {}; // 562983u9:user

    conversations.forEach((conv) => {
      conv.participants.forEach((user) => {
        if (user._id != currentUserId) {
          userMap[user._id] = user;
        }
      });
    });

    const previousUsers = Object.values(userMap);
    return res.status(200).json({
      success: true,
      previousUsers
    });

  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};