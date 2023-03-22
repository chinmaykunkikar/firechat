import { db } from "@/firebase";
import { AlertType, generateAvatar, getJoiningDate, showAlert } from "@/utils";
import { DB_COLLECTION_USERS } from "@/utils/constants";
import { AuthContext } from "@contexts/AuthContext";
import {
  ArrowPathRoundedSquareIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

type Props = {
  handleToggle?: () => void;
};

export default function UserProfile({ handleToggle }: Props) {
  const { currentUser }: any = useContext(AuthContext);

  const [picker, setPicker] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [avatars, setAvatars] = useState<string[]>([]);
  const [avatarIndex, setAvatarIndex] = useState<number | undefined>(undefined);
  const [editing, setEditing] = useState<boolean>(false);

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

  async function handleUsernameSubmit(e: any) {
    e.preventDefault();
    setEditing(false);
    if (username !== "") {
      try {
        const user = currentUser;
        const profile = {
          displayName: username,
        };
        await updateProfile(user, profile);
        await updateDoc(doc(db, DB_COLLECTION_USERS, currentUser.uid), {
          displayName: username,
        });
        showAlert(`Your display name is now ${username}`, AlertType.success);
      } catch (e) {
        showAlert("Failed to update username", AlertType.error);
      }
    }
    showAlert("Username cannot be empty", AlertType.error);
  }

  return (
    <div className="h-full cursor-default">
      {picker ? (
        <div className="min-h-full flex items-center justify-center p-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center flex items-end justify-center gap-4">
              <h2 className="text-3xl text-center leading-10 tracking-tight font-light">
                Pick an avatar
              </h2>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Regenerate avatars"
              >
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
      ) : (
        <div className="h-full flex flex-col gap-4 items-center justify-between sm:px-6 lg:px-8">
          <div className="avatar_info">
            <div className="flex flex-col justify-center items-center mt-4 gap-1">
              <div className="rounded-full w-48 h-48">
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
              </div>
              <div
                className="link link-info link-hover text-sm font-semibold"
                onClick={() => setPicker(!picker)}
              >
                change avatar
              </div>
            </div>
            <div className="flex-col flex text-sm gap-1 mt-4 items-center">
              {editing ? (
                <div className="form-control">
                  <div className="input-group">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="off"
                      autoFocus
                      required
                      className="input w-1/2 input-sm grow text-2xl font-extrabold placeholder:text-sm placeholder:font-normal focus:outline-none input-ghost focus:select-all"
                      placeholder="Enter a display name"
                      defaultValue={
                        currentUser.displayName && currentUser.displayName
                      }
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="button" onClick={handleUsernameSubmit}>
                      <CheckIcon className="ml-2 w-6 h-6" />
                    </button>
                    <button type="button" onClick={() => setEditing(false)}>
                      <XMarkIcon className="ml-2 w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="font-extrabold text-center w-1/2 text-2xl grow">
                    {currentUser.displayName}
                  </p>
                  <button type="button" onClick={() => setEditing(true)}>
                    <PencilIcon className="ml-4 w-6 h-6" />
                  </button>
                </div>
              )}
              <p className="text-secondary">{currentUser.email}</p>
              <div>Joined {getJoiningDate(currentUser.metadata.createdAt)}</div>
              <div className="tooltip tooltip-bottom" data-tip="Your unique ID">
                <p className="font-mono font-bold cursor-default blur-sm hover:filter-none">
                  {currentUser.uid}
                </p>
              </div>
            </div>
          </div>
          <div className="basis-1/6">
            <button
              disabled
              className="btn-outline btn-xs btn-error btn"
              onClick={handleToggle}
            >
              Delete your account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
