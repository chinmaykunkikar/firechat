import { db } from "@/firebase";
import { AlertType, showAlert } from "@/utils";
import {
  DB_COLLECTION_CHATS,
  DB_COLLECTION_USERCHATS,
  DB_COLLECTION_USERS,
} from "@/utils/constants";
import useDemoUser from "@/utils/isDemoUser";
import ChatContactPreview from "@components/ChatContactPreview";
import Modal from "@components/Modal";
import { AuthContext } from "@contexts/AuthContext";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
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
        collection(db, DB_COLLECTION_USERS),
        where("email", ">=", searchQuery),
        where("email", "<=", searchQuery + "\uf8ff")
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
        console.log(error);
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
      const res = await getDoc(doc(db, DB_COLLECTION_CHATS, combinedId));
      if (res.data())
        showAlert(
          `Psst! ${user.displayName} is already present in your chats.`,
          AlertType.info
        );

      if (!res.exists()) {
        await setDoc(doc(db, DB_COLLECTION_CHATS, combinedId), {
          messages: [],
        });

        await updateDoc(
          doc(db, DB_COLLECTION_USERCHATS, currentUser.uid),
          user && {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        await updateDoc(doc(db, DB_COLLECTION_USERCHATS, user?.uid), {
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
      console.log(error);
    }
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="cursor-default">
      <div className="btn btn-circle btn-ghost" onClick={handleToggle}>
        <PencilSquareIcon className="h-6 w-6" />
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
