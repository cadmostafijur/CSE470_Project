import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message, image) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("message", message);
      if (image) formData.append("image", image);

      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const seenres = await fetch(`/api/messages/seen/${data._id}`);
      const seendata = await seenres.json();
      if (seendata.error) throw new Error(seendata.error);


      setMessages([...messages, seendata]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;