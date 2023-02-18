import { AuthContext } from "@/contexts/AuthContext";
import { db } from "@/firebase";
import ChatContactPreview from "@components/ChatContactPreview";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

export default function ChatsList() {
  const [chats, setChats] = useState([]);

  const { currentUser }: any = useContext(AuthContext);

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

  return (
    <div className="flex flex-col gap-6 p-4">
      {Object.entries(chats)
        ?.sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat: any) => (
          // TODO use <ChatContactPreview /> here
          <div className="flex gap-3">
            <div>
              <div className="avatar">
                <div className="w-12 rounded-full bg-neutral-focus font-semibold text-neutral-content">
                  <img
                    src={chat[1].userInfo.photoURL}
                    alt={chat[1].userInfo.displayName}
                  />
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
