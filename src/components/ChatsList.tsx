import { AuthContext } from "@/contexts/AuthContext";
import { ChatContext } from "@/contexts/ChatContext";
import { db } from "@/firebase";
import { CheckIcon } from "@heroicons/react/24/outline";
import Avvvatars from "avvvatars-react";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

export default function ChatsList() {
  const [chats, setChats] = useState([]);

  const { currentUser }: any = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc: any) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (
    e: React.MouseEventHandler<HTMLDivElement> | undefined
  ) => {
    dispatch({ type: "CHANGE_USER", payload: e });
  };

  return (
    <div className="flex cursor-default flex-col">
      {Object.entries(chats)
        ?.sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat: any) => (
          <div
            className="flex items-center gap-4 p-4 hover:cursor-pointer hover:bg-neutral active:bg-neutral-focus"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="w-12 rounded-full">
              <Avvvatars value={chat[1].userInfo.uid} style="shape" size={48} />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">
                {chat[1].userInfo.displayName}
              </div>
              <div className="flex items-center gap-1">
                {chat[1].lastMessage.senderId === currentUser.uid && (
                  <CheckIcon className="h-4 w-4 stroke-info stroke-[3]" />
                )}
                <div className="text-neutral-content">
                  {chat[1].lastMessage?.text}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
