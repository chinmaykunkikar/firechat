import { db } from "@/firebase";
import { AlertType, generateAvatar, showAlert } from "@/utils";
import { DB_COLLECTION_USERS } from "@/utils/constants";
import { AuthContext } from "@contexts/AuthContext";
import {
  ArrowPathRoundedSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

type AvatarPickerProps = {
  picker: boolean;
  setPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AvatarPicker({ picker, setPicker }: AvatarPickerProps) {
  const { currentUser }: any = useContext(AuthContext);

  const [avatars, setAvatars] = useState<string[]>([]);
  const [avatarIndex, setAvatarIndex] = useState<number | undefined>(undefined);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  async function fetchAvatars() {
    const res = generateAvatar();
    setAvatars(res);
    setAvatarIndex(undefined);
  }

  useEffect(() => {
    fetchAvatars();
  }, []);

  async function handleAvatarSubmit(e: any) {
    e.preventDefault();
    if (avatarIndex !== undefined) {
      try {
        const user = currentUser;
        const profile = {
          photoURL: avatars[avatarIndex],
        };
        await updateProfile(user, profile);
        await updateDoc(doc(db, DB_COLLECTION_USERS, currentUser.uid), {
          photoURL: avatars[avatarIndex],
        });
        showAlert("Your avatar is updated", AlertType.success);
      } catch (e) {
        showAlert("Failed to update avatar", AlertType.error);
      }
    }
    setPicker(!picker);
  }

  return (
    <div className="flex items-center justify-center p-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center flex items-end justify-center gap-4">
          <h2 className="text-3xl text-center leading-10 tracking-tight font-light">
            Pick an avatar
          </h2>
          <div className="tooltip tooltip-bottom" data-tip="Regenerate avatars">
            <button
              className="btn btn-ghost btn-circle btn-sm"
              onClick={fetchAvatars}
            >
              <ArrowPathRoundedSquareIcon className="w-6 h-6" />
            </button>
          </div>
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => setPicker(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleAvatarSubmit}>
          <div className="flex flex-wrap -m-1 md:-m-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className={classNames(
                      index === avatarIndex
                        ? "border-2 border-secondary p-1"
                        : "cursor-pointer hover:scale-105 block object-cover",
                      "aspect-square object-center w-36 rounded-full"
                    )}
                    src={avatar}
                    onClick={() => setAvatarIndex(index)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-md shadow-sm -space-y-px"></div>
          <div>
            <button
              className="w-full btn btn-primary"
              disabled={avatarIndex === undefined}
            >
              Set avatar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
