import ChatsList from "@components/ChatsList";
import Navbar from "@components/Navbar";

export default function Sidebar() {
  return (
    <div className="basis-1/4 bg-base-300">
      <Navbar />
      <ChatsList />
    </div>
  );
}
