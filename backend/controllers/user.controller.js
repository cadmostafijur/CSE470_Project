import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Assuming req.user contains _id

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    //Naimur: Adds the last message with the users in the sidebar
    const usersWithLastMessage = await Promise.all(
      filteredUsers.map(async (user) => {

      const lastMessage = await Message.findOne({
        $or: [
          { senderId: user._id, receiverId: loggedInUserId },
          { senderId: loggedInUserId, receiverId: user._id },
        ],
        })
        .sort({ createdAt: -1 });

        let conversation = await Conversation.findOne({
          participants: { $all: [loggedInUserId, user._id] },
        });
    
        if (!conversation) {
          conversation = await Conversation.create({
            participants: [loggedInUserId, user._id],
          });
        };
      
        return {
        ...user.toObject(),
        lastMessage,
        muteStateConversation: {id: conversation._id, mutedBy: conversation.mutedBy}
        };
      })
    );
    //Naimur: Ends code for adding last message feature
    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming req.user contains userId
    const { username } = req.body; // Username from form data
    let profilePic = req.file ? req.file.path : null; // Profile picture path if uploaded

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, profilePic }, // Update fields
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user data
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all messages
    await Message.deleteMany({
      $or: [{ senderId: userId }, { receiverId: userId }]
    });

    // Delete all conversations
    await Conversation.deleteMany({
      participants: userId
    });

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Clear the JWT cookie properly
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    // res.redirect(`http://localhost:${process.env.PORT}/login`);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting account" });
  }
};







export const getUserProfile = async (req, res) => {
  try {
    // Get user id from the token or session
    const userId = req.user._id; // Ensure using the correct property (_id)
    const user = await User.findById(userId).select("-password"); // Don't return the password

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user); // Return the user profile
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};
