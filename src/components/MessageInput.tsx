// @ts-nocheck
import { useContext, useState } from "react";
import { ArrowRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "@contexts/AuthContext";
import { ChatContext } from "@contexts/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { v4 as uuid } from "uuid";
import useDemoUser from "@/utils/isDemoUser";
import { AlertType, showAlert } from "@/utils";
import { Slide, ToastContainer } from "react-toastify";

export default function MessageInput() {
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<Blob | null>(null);

  const { currentUser }: any = useContext(AuthContext);
  const { data }: any = useContext(ChatContext);

  const isDemoUser = useDemoUser();

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

        uploadTask.on(
          () => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
          senderId: currentUser.uid,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
          senderId: currentUser.uid,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
    }
  }

  return (
    <div>
      <div className="flex h-16 items-center justify-center gap-4 bg-neutral-focus px-4">
        <input
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
            onChange={(e) => setImg(e.target.files[0])}
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
