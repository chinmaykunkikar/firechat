import { db, storage } from "@/firebase";
import { AlertType, showAlert } from "@/utils";
import {
  DB_COLLECTION_CHATS,
  DB_COLLECTION_USERCHATS,
} from "@/utils/constants";
import useDemoUser from "@/utils/isDemoUser";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ArrowRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useRef, useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { v4 as uuid } from "uuid";

export default function MessageInput() {
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<Blob | null>(null);

  const emojiRef = useRef<any>(null);

  const { currentUser }: any = useContext(AuthContext);
  const { data }: any = useContext(ChatContext);

  const isDemoUser = useDemoUser();

  const onEmojiClick = (event: any) => {
    const cursor = emojiRef.current.selectionStart;

    const message = text.slice(0, cursor) + event.native + text.slice(cursor);
    setText(message);

    const newCursor = cursor + event.native.length;
    setTimeout(
      () => emojiRef.current.setSelectionRange(newCursor, newCursor),
      10
    );
  };

  function handleKey(e: any) {
    e.code === "Enter" && handleSend();
  }

  async function handleSend() {
    if (isDemoUser) {
      showAlert(
        "Sending messages is still disabled for demo users 😉",
        AlertType.info
      );
    } else {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on("state_changed", () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, DB_COLLECTION_CHATS, data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        });
      } else {
        await updateDoc(doc(db, DB_COLLECTION_CHATS, data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, DB_COLLECTION_USERCHATS, currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
          senderId: currentUser.uid,
        },
        [data.chatId + ".date"]: serverTimestamp(),
        [data.chatId + ".messageRead"]: true,
      });

      await updateDoc(doc(db, DB_COLLECTION_USERCHATS, data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
          senderId: currentUser.uid,
        },
        [data.chatId + ".date"]: serverTimestamp(),
        [data.chatId + ".messageRead"]: false,
      });

      setText("");
      setImg(null);
    }
  }

  return (
    <div>
      <div className="flex h-16 items-center justify-center gap-4 bg-neutral-focus px-4">
        <div className="dropdown dropdown-top">
          <label tabIndex={0} className="btn btn-ghost btn-circle text-2xl">
            🙂
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Picker data={emojiData} onEmojiSelect={onEmojiClick} />
          </ul>
        </div>
        <input
          ref={emojiRef}
          type="text"
          placeholder={
            isDemoUser ? "Message input is disabled for demo users." : "Message"
          }
          className="input-ghost input w-full grow p-0 focus:bg-transparent focus:outline-none disabled:cursor-default disabled:pl-2"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          value={text}
          disabled={isDemoUser}
        />
        <label className="flex aspect-square h-10 w-10 items-center justify-center rounded-lg p-1 hover:bg-neutral">
          <input
            type="file"
            id="file"
            onChange={(e) =>
              setImg(
                e.target.files instanceof FileList ? e.target.files[0] : null
              )
            }
            accept="image/*"
            className="hidden"
            disabled={isDemoUser}
          />
          <PhotoIcon />
        </label>
        <button
          className="btn-primary btn-sm btn-circle btn basis-24 text-base-content disabled:bg-base-100"
          onClick={handleSend}
          disabled={text.trim().length === 0}
        >
          <ArrowRightIcon className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
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
