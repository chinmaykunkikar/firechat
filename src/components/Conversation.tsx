import { ChatContext } from "@/contexts/ChatContext";
import { db } from "@/firebase";
import MessageBubble from "@components/MessageBubble";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
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
      {messages.length !== 0 ? (
        messages.map((message: any) => (
          <MessageBubble message={message} key={message.id} />
        ))
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <ChatBubbleLeftEllipsisIcon className="h-40 w-40 stroke-accent" />
          <p className="select-none text-lg">Strike a conversation!</p>
        </div>
      )}
    </div>
  );
}
