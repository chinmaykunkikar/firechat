import { auth } from "@/firebase";
import FirechatLogo from "@components/FirechatLogo";
import ProfileModal from "@components/ProfileModal";
import Search from "@components/Search";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Avvvatars from "avvvatars-react";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";

export default function Navbar() {
  const { currentUser }: any = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);
  const [open, setOpen] = useState<boolean>(false);

  function handleSignOut() {
    signOut(auth);
    dispatch({ type: "USER_SIGNOUT" });
  }

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="flex h-16 cursor-default items-center justify-between bg-neutral-focus px-4">
      <div className="flex items-center gap-2">
        <FirechatLogo className="h-8 w-8" />
        <span className="text-xl font-semibold">Firechat</span>
      </div>
      <div className="flex gap-2 items-center">
        <Search />
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="w-8 rounded-full hover:cursor-pointer">
            <Avvvatars value={currentUser.uid} style="shape" size={36} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-100 rounded-box"
          >
            <li>
              <a
                className="font-semibold flex py-4 border-b border-neutral"
                onClick={handleToggle}
              >
                <Avvvatars
                  value={currentUser.uid}
                  style="shape"
                  border
                  borderSize={2}
                  borderColor="#ff5040"
                  size={24}
                />
                <div className="flex flex-col">
                  <p>{currentUser.displayName}</p>
                  <p className="text-secondary text-xs">{currentUser.email}</p>
                </div>
              </a>
            </li>
            <li>
              <a onClick={handleSignOut}>
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                &nbsp;Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ProfileModal open={open} handleToggle={handleToggle} />
    </div>
  );
}
