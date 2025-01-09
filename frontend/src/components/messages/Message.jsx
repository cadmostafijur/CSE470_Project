import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message, isLast }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  //Naimur: For mesage seen the date and seen message will be reversed
  const reverse = fromMe ? "" : "flex-row-reverse";

  //Naimur: Copy message feature
  const [hoverMessage, setHoverMessage] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Hello");
      setHoverMessage("Message copied to clipboard");
      setTimeout(() => setHoverMessage(""), 2000);
    });
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='Tailwind CSS chat bubble component' src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`} style={{cursor: "pointer"}} onClick={() => copyToClipboard(message.message)} onMouseEnter={() => setHoverMessage("Click to copy")} onMouseLeave={() => setHoverMessage("")}>
        {message.message}
        {message.imageUrl && <img src={message.imageUrl} alt='Attached' className='mt-2' />}
      </div>
      <div className={`chat-footer opacity-50 text-xs flex ${reverse} gap-1 items-center`}>
      {isLast && fromMe && <div>{message.isSeen ? "Seen":"Delivered"}</div>}<div>{formattedTime}</div>
      </div>
      {hoverMessage && (
				<span style={{position: "absolute", backgroundColor: "black",color: "white",padding: "5px",borderRadius: "3px", fontSize: "12px",pointerEvents: "none"}}>
				{hoverMessage}
				</span>
			)}
    </div>
  );
};
export default Message;