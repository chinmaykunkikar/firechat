import { getJoiningDate } from "@/utils";
import Modal from "@components/Modal";
import { AuthContext } from "@contexts/AuthContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Avvvatars from "avvvatars-react";
import { useContext } from "react";

type Props = {
  open: boolean;
  handleToggle: () => void;
};

export default function ProfileModal({ open, handleToggle }: Props) {
  const { currentUser }: any = useContext(AuthContext);

  return (
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
  );
}
