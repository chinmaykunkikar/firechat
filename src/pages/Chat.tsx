import ChatMain from "@components/ChatMain";
import Sidebar from "@components/Sidebar";

export default function Chat() {
  return (
    <div className="home flex h-screen items-center justify-center">
      <div className="card flex h-[90%] w-[90%] flex-row overflow-hidden shadow-xl">
        <Sidebar />
        <ChatMain />
      </div>
    </div>
  );
}
