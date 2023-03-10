import { AuthContext } from "@/contexts/AuthContext";
import { ChatContext } from "@/contexts/ChatContext";
import Avvvatars from "avvvatars-react";
import { useContext, useEffect, useRef } from "react";

export default function MessageBubble({ message }: any) {
  const { currentUser }: any = useContext(AuthContext);
  const { data }: any = useContext(ChatContext);

  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  }, [message]);

  const getMessageTime = () => {
    const timenum = message.date;
    const lastMessage = new Date(
      timenum.seconds * 1000 + timenum.nanoseconds / 10000
    );
    var today = new Date();
    if (today.toLocaleDateString() === lastMessage.toLocaleDateString()) {
      if (Number(lastMessage) >= Number(today)) return "Just Now";
      else return lastMessage.toLocaleTimeString();
    } else return lastMessage.toLocaleDateString();
  };

  return (
    <div
      className={`chat ${
        message.senderId === currentUser.uid ? "chat-end" : "chat-start"
      }`}
      ref={scrollRef}
    >
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <Avvvatars
            value={
              message.senderId === currentUser.uid
                ? currentUser.uid
                : data.user.uid
            }
            style="shape"
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          message.senderId === currentUser.uid
            ? "chat-bubble-primary"
            : "chat-bubble-accent"
        }`}
      >
        {message.text}
      </div>
      <div className="chat-footer opacity-50">{getMessageTime()}</div>
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
