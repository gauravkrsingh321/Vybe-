import Group from "../models/group.model.js";
import { Message } from "../models/message.model.js";
import uploadToCloudinary from "../config/cloudinary.js";

//POST /groups Creating a new group
export const createGroup = async (req, res) => {
  try {
    const { groupName, groupDescription } = req.body;

    if (!groupName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }

    const newGroup = await Group.create({
      groupName,
      groupDescription,
      groupAdmin: req.userId,
      groupMembers: [req.userId],
    });

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      newGroup,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET /groups Fetch groups belonging to logged-in user
export const getGroupsOfLoggedInUser = async (req, res) => {
  try {
    const groups = await Group.find({
      groupMembers: req.userId,
    });

    res.status(200).json({
      success: true,
      message: "Groups fetched successfully",
      groups,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE /groups/:groupId Delete a specific group
export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }
    if (group.groupAdmin.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Only the group admin can delete the group",
      });
    }
    await group.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//POST /groups/:groupId/members Add members to existing group
export const addMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { groupMembers } = req.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }

    if (!Array.isArray(groupMembers) || groupMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Group members are required",
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (group.groupAdmin.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Only the group admin can add members to the group",
      });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        $addToSet: {
          groupMembers: { $each: groupMembers },
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Members added successfully",
      group: updatedGroup,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE /groups/:groupId/members/:memberId Remove a specific member
export const kickMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { memberId } = req.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member Id is required",
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Only group admin can kick members
    if (group.groupAdmin.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Only the group admin can kick a member",
      });
    }

    // Admin cannot kick themselves
    if (memberId === req.userId) {
      return res.status(400).json({
        success: false,
        message: "Group admin cannot remove themselves",
      });
    }

    const isMember = group.groupMembers.some(
      (member) => member.toString() === memberId,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "User is not a member of this group",
      });
    }

    group.groupMembers = group.groupMembers.filter(
      (member) => member.toString() !== memberId,
    );

    await group.save();

    return res.status(200).json({
      success: true,
      message: "Member kicked successfully",
      group,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//PATCH /groups/:groupId/admin Change the group's admin
export const transferAdmin = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { memberId } = req.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member Id is required",
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (group.groupAdmin.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Only the group admin can transfer admin rights",
      });
    }

    const isMember = group.groupMembers.some(
      (member) => member.toString() === memberId,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "User is not a member of this group",
      });
    }

    group.groupAdmin = memberId;
    await group.save();

    return res.status(200).json({
      success: true,
      message: "New admin assigned successfully",
      group,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE /groups/:groupId/members/me Logged-in user removes themselves
export const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Check whether the logged-in user is a member
    const isMember = group.groupMembers.some(
      (member) => member.toString() === req.userId,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

    // Admin must transfer admin rights before leaving if they are the group admin
    if (group.groupAdmin.toString() === req.userId) {
      return res.status(400).json({
        success: false,
        message: "Group admin must transfer admin rights before leaving",
      });
    }

    // Remove logged-in user from group
    group.groupMembers = group.groupMembers.filter(
      (member) => member.toString() !== req.userId,
    );

    await group.save();

    return res.status(200).json({
      success: true,
      message: "Group left successfully",
      group,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET /groups/:groupId Fetch one specific group
export const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }

    const group = await Group.findById(groupId)

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isMember = group.groupMembers.some(
      (member) => member._id.toString() === req.userId,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

      // Populate only after authorization
    await group.populate([
      {
        path: "groupAdmin",
        select: "name username profilePic",
      },
      {
        path: "groupMembers",
        select: "name username profilePic",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Group fetched successfully",
      group,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//POST /groups/:groupId/messages Send/Create message to a specific group
export const sendGroupMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const { groupId } = req.params;
    const { message } = req.body;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }

    // Message can be text, image, or both
    if (!message?.trim() && !req.file) {
      return res.status(400).json({
        success: false,
        message: "Message or image is required",
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isMember = group.groupMembers.some(
      (member) => member.toString() === senderId,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

    let image;

    if (req.file) {
      image = await uploadToCloudinary(req.file.path);
    }

    const newGroupMessage = await Message.create({
      sender: senderId,
      group: groupId,
      message,
      image,
    });

    group.groupMessages.push(newGroupMessage._id);

    await group.save();

    return res.status(201).json({
      success: true,
      message: "Group message sent successfully",
      newGroupMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET /groups/:groupId/messages Fetch all messages of a specific group
export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isMember = group.groupMembers.some(
      (member) => member.toString() === req.userId,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

    const messages = await Message.find({ group: groupId })
      .populate("sender", "name username profilePic")
      .sort({ createdAt: 1 });
    return res.status(200).json({
      success: true,
      message: "Group Messages fetched successfully",
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE /groups/:groupId/messages/:messageId Delete a specific message from a group
export const deleteGroupMessage = async (req, res) => {
  try {
    const { groupId, messageId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group Id is required",
      });
    }

    if (!messageId) {
      return res.status(400).json({
        success: false,
        message: "Message Id is required",
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    // Check whether logged-in user is a member
    const isMember = group.groupMembers.some(
      (member) => member.toString() === req.userId,
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Make sure this message belongs to this group
    if (message.group.toString() !== groupId) {
      return res.status(400).json({
        success: false,
        message: "Message does not belong to this group",
      });
    }

    // Only the sender can delete the message
    if (message.sender.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this message",
      });
    }

    // Delete the message document
    await message.deleteOne();

    // Remove message ID from group's groupMessages array
    group.groupMessages = group.groupMessages.filter(
      (id) => id.toString() !== messageId,
    );

    await group.save();
    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
