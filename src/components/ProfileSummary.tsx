import { db } from "@/firebase";
import { AlertType, getJoiningDate, showAlert } from "@/utils";
import { DB_COLLECTION_USERS } from "@/utils/constants";
import { AuthContext } from "@contexts/AuthContext";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";

type ProfileSummaryProps = {
  picker: boolean;
  setPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileSummary({
  picker,
  setPicker,
}: ProfileSummaryProps) {
  const { currentUser }: any = useContext(AuthContext);

  const [username, setUsername] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);

  const { success, error } = AlertType;

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
        showAlert(`Your display name is now ${username}`, success);
      } catch (e) {
        showAlert("Failed to update username", error);
      }
    }
    showAlert("Username cannot be empty", error);
  }
  return (
    <>
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
            <div className="tooltip tooltip-bottom" data-tip="Your user ID">
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
            onClick={undefined}
          >
            Delete your account
          </button>
        </div>
      </div>
    </>
  );
}
