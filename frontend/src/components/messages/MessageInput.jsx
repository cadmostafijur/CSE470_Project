import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";
import { FaImage } from "react-icons/fa"; // Import image icon from react-icons

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !image) return;
    await sendMessage(message, image);
    setMessage("");
    setImage(null);
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        {/* Text Input */}
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white pr-20"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* File Upload Button */}
        <div className="absolute inset-y-0 right-20 flex items-center">
          <label className="cursor-pointer flex items-center">
            <FaImage className="text-gray-500 text-xl hover:text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>

        {/* Emoji Picker Toggle */}
        <button
          type="button"
          className="absolute inset-y-0 right-12 flex items-center text-xl text-gray-400 hover:text-white"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <GrEmoji />
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-12 right-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        {/* Send Button */}
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pe-3">
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;