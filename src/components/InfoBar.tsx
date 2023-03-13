import { SyntheticEvent, useContext, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@/contexts/ChatContext";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { db } from "@/firebase";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import Avvvatars from "avvvatars-react";
import Modal from "@components/Modal";

export default function InfoBar() {
  const { currentUser }: any = useContext(AuthContext);
  const { data, dispatch }: any = useContext(ChatContext);

  const [open, setOpen] = useState<boolean>(false);

  async function deleteChat(e: SyntheticEvent) {
    e.preventDefault();
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId]: deleteField(),
    });
    await updateDoc(doc(db, "userChats", data?.user.uid), {
      [data.chatId]: deleteField(),
    });
    await deleteDoc(doc(db, "chats", data.chatId));
    dispatch({ type: "CHAT_DELETE" });
    setOpen((prev) => !prev);
  }

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div>
      <div className="flex h-16 select-none items-center justify-between bg-secondary-focus px-6">
        <div className="flex items-center gap-4">
          <Avvvatars value={data?.user.uid} style="shape" />
          <div className="text-lg font-semibold">{data?.user.displayName}</div>
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-square btn-sm btn">
            <EllipsisVerticalIcon className="h-8 w-8" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a onClick={handleToggle}>
                <TrashIcon className="h-6 w-6 stroke-error" />
                Delete Chat
              </a>
            </li>
          </ul>
        </div>
        <Modal open={open} onClose={handleToggle}>
          <div className="flex items-center gap-2 text-lg font-bold">
            <Avvvatars value={data.user.uid} style="shape" size={36} />
            Delete this chat?
          </div>
          <p className="py-2">
            <span className="font-bold">{data.user.displayName}</span>
            &nbsp;will lose this chat too.
          </p>
          <p className="font-bold text-warning">This cannot be undone.</p>
          <div className="modal-action">
            <button className="btn-primary btn" onClick={handleToggle}>
              Cancel
            </button>
            <button className="btn-outline btn-error btn" onClick={deleteChat}>
              Delete Chat
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
