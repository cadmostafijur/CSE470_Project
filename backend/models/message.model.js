import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    isSeen: { //Naimur: New attribute for message seen feature
			type: Boolean,
			default: false,
		}
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;