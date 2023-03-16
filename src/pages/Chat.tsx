import ChatMain from "@components/ChatMain";
import Sidebar from "@components/Sidebar";

export default function Chat() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-screen w-screen flex-row overflow-hidden">
        <Sidebar />
        <ChatMain />
      </div>
    </div>
  );
}
