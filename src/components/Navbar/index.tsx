import { AuthContext } from "@contexts/AuthContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";

export default function Navbar() {
  const { currentUser }: any = useContext(AuthContext);
  return (
    <div className="flex h-16 select-none items-center justify-between bg-secondary px-4">
      <span className="text-xl font-semibold">Fire Chat</span>
      <div className="flex items-center justify-center gap-2">
        <div>
          <div className="avatar">
            <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
              <img src={currentUser.photoURL} alt={currentUser.displayName} />
            </div>
          </div>
        </div>
        <div className="font-semibold">{currentUser.displayName}</div>
        <button
          className="btn-ghost btn-square btn-xs btn"
          onClick={() => signOut(auth)}
        >
          <ArrowRightOnRectangleIcon />
        </button>
      </div>
    </div>
  );
}
