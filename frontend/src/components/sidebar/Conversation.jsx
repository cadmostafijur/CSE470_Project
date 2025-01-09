import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { BsFillBellFill, BsBellSlashFill } from "react-icons/bs";
import toast from "react-hot-toast";

const Conversation = ({ conversation, lastIdx, emoji, isConversationMuted }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	//Naimur: unseen or unmuted message will show bold, seen or muted message will show normal
	const { authUser } = useAuthContext();
	const isUnread = conversation.lastMessage?.isSeen || conversation.lastMessage?.senderId === authUser._id || isConversationMuted.mutedBy?.includes(authUser._id) ? "" : "font-bold";
	const isUnreadTextColor = conversation.lastMessage?.isSeen || conversation.lastMessage?.senderId === authUser._id || isConversationMuted.mutedBy?.includes(authUser._id) ? "#adb5bd" : "#e5e5e5";
	const isLastMessageMine = conversation.lastMessage?.senderId === authUser._id;

	//Naimur: clicks mute chat option
	const handleBellClick = async (event) => {
		event.stopPropagation();
		console.log(conversation);
		try {
		  const res = await fetch(`/api/messages/mute/${isConversationMuted.id}`);
		  const data = await res.json();
		  if (data.error) throw new Error(data.error);
		  window.location.reload();
		} catch (error) {
		  toast.error(error.message);
		}
	};

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between items-center'>
						<div>
							<p className='font-bold text-gray-200'>{conversation.fullName}</p>
							<p className={`${isUnread}`} style={{color: `${isUnreadTextColor}`}}>{isLastMessageMine ? "You: ": ""}{conversation.lastMessage?.message?.trim().length!==0 ? conversation.lastMessage?.message : "sent a photo"}</p>
						</div>
						<div>
						<div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full group-hover:bg-gray-200" onClick={handleBellClick}>
							{isConversationMuted.mutedBy?.includes(authUser._id) ? <BsBellSlashFill className="text-gray-600" /> : <BsFillBellFill className="text-gray-600" />}
						</div>
							<span className='text-xl'>{emoji}</span>
						</div>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;
