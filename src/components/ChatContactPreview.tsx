import { db } from "@/firebase";
import { AuthContext } from "@contexts/AuthContext";
import Avvvatars from "avvvatars-react";
import {
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";

type ChatContactPreviewProps = {
  hit?: any;
  handleSearchSelect?: React.MouseEventHandler<HTMLDivElement> | undefined;
  user?: DocumentData;
};

export default function ChatContactPreview({
  hit,
  handleSearchSelect: any,
}: ChatContactPreviewProps) {
  const { currentUser }: any = useContext(AuthContext);

  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<DocumentData>();
  const [error, setError] = useState<boolean>(false);

  async function handleSelect() {
    const combinedId =
      hit &&
      (currentUser.uid > hit.uid
        ? currentUser.uid + hit.uid
        : hit.uid + currentUser.uid);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(
          doc(db, "userChats", currentUser.uid),
          hit && {
            [combinedId + ".userInfo"]: {
              uid: hit.uid,
              displayName: hit.displayName,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        await updateDoc(doc(db, "userChats", hit?.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setError(true);
    }
    setUser(undefined);
    setUsername("");
  }
  return (
    <div
      className="flex items-center gap-4 p-4 hover:cursor-pointer hover:bg-neutral active:bg-neutral-focus"
      onClick={handleSelect}
    >
      <div className="w-12 rounded-full">
        <Avvvatars value={hit?.uid} style="shape" size={48} />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">{hit?.displayName}</div>
      </div>
    </div>
  );
}
