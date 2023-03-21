import DeleteChatModal from "./DeleteChatModal";
import { db } from "@/firebase";
import {
  DB_COLLECTION_CHATS,
  DB_COLLECTION_USERCHATS,
} from "@/utils/constants";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { MouseEvent, useContext, useState } from "react";

export default function InfoBar() {
  const { currentUser }: any = useContext(AuthContext);
  const { data, dispatch }: any = useContext(ChatContext);

  const [open, setOpen] = useState<boolean>(false);

  async function deleteChat(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setOpen(false);
    await deleteDoc(doc(db, DB_COLLECTION_CHATS, data?.chatId));
    await updateDoc(doc(db, DB_COLLECTION_USERCHATS, currentUser.uid), {
      [data.chatId]: deleteField(),
    });
    await updateDoc(doc(db, DB_COLLECTION_USERCHATS, data?.user.uid), {
      [data.chatId]: deleteField(),
    });
    dispatch({ type: "CHAT_DELETE" });
  }

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div>
      <div className="flex h-16 select-none items-center justify-between bg-secondary-focus px-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full">
            <img src={data?.user.photoURL} alt={data?.user.displayName} />
          </div>
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
        <DeleteChatModal
          open={open}
          handleToggle={handleToggle}
          deleteChat={deleteChat}
        />
      </div>
    </div>
  );
}
