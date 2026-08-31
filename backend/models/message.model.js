import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required:true
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    message: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
  },

  { timestamps: true },
);

export const Message = mongoose.model("Message", messageSchema);
