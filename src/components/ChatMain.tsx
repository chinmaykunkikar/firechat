import Conversation from "@components/Conversation";
import InfoBar from "@components/InfoBar";
import MessageInput from "@components/MessageInput";
import { ChatContext } from "@contexts/ChatContext";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function ChatMain() {
  const { data }: any = useContext(ChatContext);

  return (
    <div className="flex grow flex-col bg-neutral">
      {data.chatId !== null ? (
        <>
          <InfoBar />
          <Conversation />
          <MessageInput />
        </>
      ) : (
        <div className="flex grow flex-col items-center justify-center">
          <ChatBubbleLeftRightIcon className="h-40 w-40 stroke-accent" />
          <p className="select-none text-lg">
            Click on a chat to start messaging
          </p>
        </div>
      )}
    </div>
  );
}
