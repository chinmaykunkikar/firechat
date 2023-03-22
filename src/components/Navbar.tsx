import { auth } from "@/firebase";
import FirechatLogo from "@components/FirechatLogo";
import Search from "@components/Search";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import { UserProfileContext } from "@contexts/UserProfileContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { useContext } from "react";

export default function Navbar() {
  const { currentUser }: any = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);
  const { toggleIsOpen }: any = useContext(UserProfileContext);

  function handleSignOut() {
    signOut(auth);
    dispatch({ type: "USER_SIGNOUT" });
  }

  return (
    <div className="flex h-16 cursor-default items-center justify-between bg-neutral-focus px-4">
      <div className="flex items-center gap-2">
        <FirechatLogo className="h-8 w-8" />
        <span className="text-xl font-semibold">Firechat</span>
      </div>
      <div className="flex gap-2 items-center">
        <Search />
        <div className="dropdown dropdown-end w-8">
          <label tabIndex={0} className="rounded-full hover:cursor-pointer">
            <img src={currentUser.photoURL} alt={currentUser.displayName} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-100 rounded-box"
          >
            <li>
              <a
                className="font-semibold flex py-4 border-b border-neutral"
                onClick={() => toggleIsOpen()}
              >
                <div className="rounded-full w-6 h-6">
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                  />
                </div>
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
    </div>
  );
}
