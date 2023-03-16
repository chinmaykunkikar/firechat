import FirechatLogo from "./FirechatLogo";
import Modal from "./Modal";
import Search from "./Search";
import { auth } from "@/firebase";
import { getJoiningDate } from "@/utils";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import {
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
                <ArrowRightOnRectangleIcon className="h-6 w-6" /> Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Modal open={open} onClose={handleToggle}>
        <div className="flex justify-end items-center">
          <button
            className="btn-sm p-1 btn-ghost btn-circle btn"
            onClick={handleToggle}
          >
            <XMarkIcon className="stroke-2" />
          </button>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className="flex flex-col gap-2 items-center">
            <Avvvatars value={currentUser.uid} style="shape" size={72} />
            <div className="link link-info link-hover text-xs hover:cursor-not-allowed">
              change
            </div>
          </div>
          <div className="flex-col flex gap-1 text-sm">
            <p className="font-extrabold text-2xl">{currentUser.displayName}</p>
            <p className="text-secondary -mt-1">{currentUser.email}</p>
            <div>Joined {getJoiningDate(currentUser.metadata.createdAt)}</div>
            <div className="flex items-baseline">
              <p className="font-semibold">UID</p>
              <p className="font-mono">&nbsp;{currentUser.uid}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            disabled
            className="btn-outline btn-xs btn-error btn"
            onClick={handleToggle}
          >
            Delete your account
          </button>
        </div>
      </Modal>
    </div>
  );
}
