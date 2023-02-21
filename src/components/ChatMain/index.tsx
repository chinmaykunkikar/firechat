import InfoBar from "@components/InfoBar";
import Conversation from "@components/Conversation";
import MessageInput from "@components/MessageInput";

export default function ChatMain() {
  return (
    <div className="flex grow flex-col bg-neutral">
      <InfoBar />
      <Conversation />
      <MessageInput />
    </div>
  );
}
