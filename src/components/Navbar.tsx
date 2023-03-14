import FirechatLogo from "./FirechatLogo";
import { auth } from "@/firebase";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Avvvatars from "avvvatars-react";
import { signOut } from "firebase/auth";
import { useContext } from "react";

export default function Navbar() {
  const { currentUser }: any = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);

  function handleSignOut() {
    signOut(auth);
    dispatch({ type: "USER_SIGNOUT" });
  }

  return (
    <div className="flex h-16 select-none items-center justify-between bg-neutral-focus px-4">
      <div className="flex items-center gap-2">
        <FirechatLogo className="h-8 w-8" />
        <span className="text-xl font-semibold">Firechat</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <Avvvatars value={currentUser.uid} style="shape" />
          </div>
        </div>
        <div className="font-semibold">{currentUser.displayName}</div>
        <button
          className="btn-ghost btn-square btn-sm btn gap-2"
          onClick={handleSignOut}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
