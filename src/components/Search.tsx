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
import Modal from "@components/Modal";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ChatContactPreview from "./ChatContactPreview";

export default function Search() {
  const [searchQuery, setQuery] = useState<string>("");
  const [users, setUsers] = useState<DocumentData>();
  const [error, setError] = useState<boolean>(false);
  const [noUsers, setNoUsers] = useState<boolean>(false);
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
    const queryString = event.target.value;
    if (queryString.length === 0) {
      setQuery("");
      setNoUsers(false);
    }
    setQuery(queryString);
  }

  async function handleSearch() {
    if (isDemoUser) {
      showAlert("Demo users still can't search other users 😉", AlertType.info);
    } else {
      const q = query(
        collection(db, "users"),
        where("displayName", ">=", searchQuery),
        where("displayName", "<=", searchQuery + "\uf8ff")
      );

      try {
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((doc) => doc.data());
        if (
          queryData.filter((user: DocumentData) => !user.demoUser).length === 0
        )
          setNoUsers(true);
        setUsers(queryData);
      } catch (error) {
        setError(true);
      }
    }
  }

  async function handleSelect(user: DocumentData) {
    const combinedId =
      user &&
      (currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (res)
        showAlert(
          `Psst! ${user.displayName} is already present in your chats.`,
          AlertType.info
        );

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
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="cursor-default">
      <div
        className="flex w-full cursor-pointer items-center gap-2 p-4 text-secondary"
        onClick={handleToggle}
      >
        <MagnifyingGlassIcon className="h-6 w-6 stroke-accent stroke-[3]" />
        <p className="text-sm font-bold">Find users to start conversations</p>
      </div>
      <Modal open={open} onClose={handleToggle}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-bold">Find users by their names</p>
          <button
            className="btn-ghost btn-xs btn-circle btn"
            onClick={handleToggle}
          >
            <XMarkIcon />
          </button>
        </div>
        <input
          type="text"
          autoFocus
          placeholder={
            isDemoUser ? "Search is disabled for demo users." : "Search\u2026"
          }
          onKeyDown={handleKey}
          onChange={handleType}
          value={searchQuery}
          disabled={isDemoUser}
          className="input-bordered input w-full text-lg focus:bg-transparent focus:outline-none disabled:cursor-default"
        />
        {error && (
          <span className="px-4 text-sm font-semibold text-warning">
            Search has run into some problems.
          </span>
        )}
        {users &&
          users
            .filter((user: DocumentData) => !user.demoUser)
            .filter((user: DocumentData) => user.uid !== currentUser.uid)
            .map((user: DocumentData) => (
              <ChatContactPreview
                user={user}
                handleSearchSelect={() => handleSelect(user)}
              />
            ))}
        {noUsers && (
          <div className="mt-1 w-full p-1 font-semibold text-info">
            User not found.
          </div>
        )}
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
