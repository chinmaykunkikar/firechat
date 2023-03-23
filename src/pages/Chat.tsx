import ChatMain from "@components/ChatMain";
import Sidebar from "@components/Sidebar";
import { UserProfileContextProvider } from "@contexts/UserProfileContext";

export default function Chat() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-screen w-screen flex-row overflow-hidden">
        <UserProfileContextProvider>
          <Sidebar />
          <ChatMain />
        </UserProfileContextProvider>
      </div>
    </div>
  );
}
