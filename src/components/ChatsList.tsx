import { AuthContext } from "@/contexts/AuthContext";
import { ChatContext } from "@/contexts/ChatContext";
import { db } from "@/firebase";
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
    <div className="flex cursor-default flex-col gap-6 p-4">
      {Object.entries(chats)
        ?.sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat: any) => (
          <div
            className="flex gap-3"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <Avvvatars value={chat[1].userInfo.uid} style="shape" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">
                {chat[1].userInfo.displayName}
              </div>
              <div className="text-neutral-content">
                {chat[1].lastMessage?.text}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
