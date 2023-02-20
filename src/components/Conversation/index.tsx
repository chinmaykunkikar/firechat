import { ChatContext } from "@/contexts/ChatContext";
import { db } from "@/firebase";
import MessageBubble from "@components/MessageBubble";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const { data }: any = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="grow overflow-y-auto p-4">
      {messages.map((message: any) => (
        <MessageBubble message={message} key={message.id} />
      ))}
    </div>
  );
}
