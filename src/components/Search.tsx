import { AuthContext } from "@contexts/AuthContext";
import { db } from "@/firebase";
import useDemoUser from "@/utils/isDemoUser";
import { AlertType, showAlert } from "@/utils";
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
import { Slide, ToastContainer } from "react-toastify";
import ChatContactPreview from "@components/ChatContactPreview";
import Modal from "@components/Modal";

export default function Search() {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<DocumentData>();
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { currentUser }: any = useContext(AuthContext);
  const isDemoUser = useDemoUser();

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  function handleKey(e: React.KeyboardEvent) {
    e.code === "Enter" && handleSearch();
  }

  function handleType(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    if (query.length === 0) {
      setUser(undefined);
      setUsername("");
    }
    setUsername(query);
  }

  async function handleSearch() {
    if (isDemoUser) {
      showAlert("Demo users still can't search other users 😉", AlertType.info);
    } else {
      const q = query(
        collection(db, "users"),
        where("displayName", ">=", username),
        where("displayName", "<=", username + "\uf8ff")
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
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        await updateDoc(doc(db, "userChats", user?.uid), {
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
    setOpen(false);
  }

  return (
    <div className="cursor-default">
      <input
        type="text"
        placeholder={
          isDemoUser
            ? "Search is disabled for demo users."
            : "Find users and start conversations"
        }
        onClick={handleToggle}
        disabled={isDemoUser}
        className="input-ghost input input-sm my-2 w-full cursor-pointer rounded-none caret-transparent focus:bg-transparent focus:outline-none disabled:cursor-default"
      />
      <Modal open={open} onClose={handleToggle}>
        <input
          type="text"
          placeholder={
            isDemoUser ? "Search is disabled for demo users." : "Search\u2026"
          }
          onKeyDown={handleKey}
          onChange={handleType}
          value={username}
          disabled={isDemoUser}
          className="input-bordered input w-full text-lg focus:bg-transparent focus:outline-none disabled:cursor-default"
        />
        {error && (
          <span className="px-4 text-sm font-semibold text-warning">
            User not found. Try searching for the exact name.
          </span>
        )}
        {user && (
          <div>
            <ChatContactPreview user={user} handleSearchSelect={handleSelect} />
          </div>
        )}
        <div className="modal-action justify-center">
          <button
            className="btn-outline btn-secondary btn-wide btn"
            onClick={handleToggle}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <ToastContainer
        theme="colored"
        position="top-center"
        transition={Slide}
        autoClose={5000}
        hideProgressBar
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
}
