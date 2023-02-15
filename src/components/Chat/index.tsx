import ChatInfoBar from "@components/ChatInfoBar";
import Conversation from "@components/Conversation";
import MessageInput from "@components/MessageInput";

export default function Chat() {
  return (
    <div className="flex grow flex-col bg-neutral">
      <ChatInfoBar />
      <Conversation />
      <MessageInput />
    </div>
  );
}
