import { db } from "@/firebase";
import { DB_COLLECTION_USERCHATS } from "@/utils/constants";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import { CheckIcon, EyeIcon } from "@heroicons/react/24/outline";
import Avvvatars from "avvvatars-react";
import { doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

export default function ChatsList() {
  const [chats, setChats] = useState<DocumentData>([]);

  const { currentUser }: any = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, DB_COLLECTION_USERCHATS, currentUser.uid),
        (doc: DocumentData) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = async (e: any) => {
    dispatch({ type: "CHANGE_USER", payload: e });
    const chatId =
      currentUser.uid > e?.uid
        ? currentUser.uid + e?.uid
        : e?.uid + currentUser.uid;
    await updateDoc(doc(db, DB_COLLECTION_USERCHATS, currentUser.uid), {
      [chatId + ".messageRead"]: true,
    });
  };

  return (
    <div className="flex cursor-default flex-col">
      {Object.entries(chats)
        ?.sort((a: DocumentData, b: DocumentData) => b[1].date - a[1].date)
        .map((chat: DocumentData) => (
          <div
            className="flex items-center gap-4 p-4 hover:cursor-pointer hover:bg-neutral active:bg-neutral-focus"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="w-12 rounded-full">
              <img
                src={chat[1].userInfo?.photoURL}
                alt={chat[1].userInfo?.displayName}
              />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">
                {chat[1].userInfo?.displayName}
              </div>
              <div className="flex items-center gap-1">
                {chat[1].lastMessage?.senderId === currentUser.uid && (
                  <CheckIcon className="h-4 w-4 stroke-info stroke-[3]" />
                )}
                <div className="text-neutral-content">
                  {chat[1].lastMessage?.text}
                </div>
              </div>
            </div>
            {!chat[1].messageRead && (
              <div className="grow text-end">
                <div className="badge badge-success font-bold">
                  <EyeIcon className="h-4 w-4" />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
