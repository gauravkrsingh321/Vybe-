import mongoose from "mongoose";

export const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      trim: true,
      required: true,
    },
    groupDescription: {
      type: String,
      trim: true,
    },
    groupMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true },
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
