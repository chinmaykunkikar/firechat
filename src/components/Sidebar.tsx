import ChatsList from "@components/ChatsList";
import Navbar from "@components/Navbar";
import AlgoliaSearch from "./AlgoliaSearch";

export default function Sidebar() {
  return (
    <div className="basis-1/3 overflow-y-scroll bg-base-300">
      <Navbar />
      <AlgoliaSearch />
      <ChatsList />
    </div>
  );
}
