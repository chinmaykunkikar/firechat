import UserProfile from "./UserProfile";
import ChatsList from "@components/ChatsList";
import Navbar from "@components/Navbar";
import { UserProfileContext } from "@contexts/UserProfileContext";
import { useContext } from "react";

export default function Sidebar() {
  const { isOpen }: any = useContext(UserProfileContext);

  return (
    <div className="basis-1/4 bg-base-300">
      <Navbar />
      {isOpen ? <UserProfile /> : <ChatsList />}
    </div>
  );
}
