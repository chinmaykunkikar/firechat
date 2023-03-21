import { getMessageDate, getMessageTime } from "@/utils";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import Avvvatars from "avvvatars-react";
import { useContext } from "react";

export default function MessageBubble({ message }: any) {
  const { currentUser }: any = useContext(AuthContext);
  const { data }: any = useContext(ChatContext);

  return (
    <div
      className={`chat ${
        message.senderId === currentUser.uid ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt={
              message.senderId === currentUser.uid
                ? currentUser.displayName
                : data.user.displayName
            }
          />
        </div>
      </div>
      <div className="chat-header opacity-50">
        {getMessageDate(message.date.toDate())}
      </div>
      <div
        className={`chat-bubble ${
          message.senderId === currentUser.uid
            ? "chat-bubble-primary"
            : "chat-bubble-accent"
        }`}
      >
        {message.text}
        <div className="chat-footer opacity-50 font-semibold text-[10px]">
          {getMessageTime(message.date.toDate())}
        </div>
      </div>
      {message.img && (
        <img
          className="m-6 w-40 rounded border-2 border-primary-content p-4"
          src={message.img}
          alt=""
        />
      )}
    </div>
  );
}
