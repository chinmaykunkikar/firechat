import ChatsList from "@components/ChatsList";
import Navbar from "@components/Navbar";
import Search from "@components/Search";

export default function Sidebar() {
  return (
    <div className="basis-1/3 border-r bg-base-300">
      <Navbar />
      <Search />
      <ChatsList />
    </div>
  );
}
