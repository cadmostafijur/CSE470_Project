import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      imageUrl,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //Naimur: passing mute state to mute sound
      const newMessagePayload = {
        ...newMessage.toObject(),
        isMuted: conversation.mutedBy.includes(receiverId),
      };
      io.to(receiverSocketId).emit("newMessage", newMessagePayload);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    //Naimur: Message Seen Feature
		const messageIdsToUpdate = conversation.messages
		.filter(message => message.receiverId.toString() === senderId.toString() && !message.isSeen)
		.map(message => message._id);
	  
		await Message.updateMany(
			{ _id: { $in: messageIdsToUpdate } },
			{ $set: { isSeen: true } }
		);

		const updatedConversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");
    //Naimur: End of code for message seen feature

    const messages = updatedConversation.messages;

		res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Naimur: check current seen message
export const currentSeenMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findById(messageId);

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

//Naimur: Conversation Muting Feature
export const muteConversation = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    let conversation = await Conversation.findById(conversationId);
    
    if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
      });
    };
    if (!Array.isArray(conversation.mutedBy)) {
      conversation.mutedBy = [];
    }
    
    if (conversation.mutedBy.includes(req.user._id)) {
      conversation.mutedBy = conversation.mutedBy.filter(id => id.toString() !== req.user._id.toString());
    } else {
      conversation.mutedBy.push(req.user._id);
    }
    
    await conversation.save();
    
    res.status(200).json(conversation);
  } catch (error) {
    console.log("Error in muteConversation controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadMiddleware = upload.single("image");