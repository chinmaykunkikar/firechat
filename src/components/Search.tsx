import { AuthContext } from "@/contexts/AuthContext";
import { db } from "@/firebase";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import ChatContactPreview from "./ChatContactPreview";

export default function Search() {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<DocumentData>();
  const [error, setError] = useState<boolean>(false);

  const { currentUser }: any = useContext(AuthContext);

  async function handleSearch() {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  }

  function handleKey(e: any) {
    e.code === "Enter" && handleSearch();
  }

  async function handleSelect() {
    const combinedId =
      user &&
      (currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(
          doc(db, "userChats", currentUser.uid),
          user && {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        await updateDoc(doc(db, "userChats", user?.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
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
    <div>
      <input
        type="text"
        placeholder="Search for a user&#8230;"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className="input-ghost input input-sm mt-2 w-full rounded-none focus:bg-transparent focus:outline-none"
      />
      {error && (
        <span className="text-sm font-semibold text-warning">
          User not found. Try searching for the exact name.
        </span>
      )}
      <div className="px-3">
        {user && (
          <ChatContactPreview user={user} handleSearchSelect={handleSelect} />
        )}
      </div>
      <div className="divider m-0"></div>
    </div>
  );
}
