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