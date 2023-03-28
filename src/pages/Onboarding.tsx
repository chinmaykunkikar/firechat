import { db } from "@/firebase";
import { AlertType, generateAvatar, showAlert } from "@/utils";
import { DB_COLLECTION_USERS, ROUTE_CHAT } from "@/utils/constants";
import FirechatLogo from "@components/FirechatLogo";
import { AuthContext } from "@contexts/AuthContext";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const { currentUser }: any = useContext(AuthContext);

  const [avatars, setAvatars] = useState<string[]>([]);
  const [avatarIndex, setAvatarIndex] = useState<number | undefined>(undefined);
  const [username, setUsername] = useState<string>(currentUser.displayName);

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

  async function handleSubmit(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    if (avatarIndex !== undefined && username !== "") {
      try {
        const user = currentUser;
        const profile = {
          displayName: username,
          photoURL: avatars[avatarIndex],
        };
        await updateProfile(user, profile);
        await updateDoc(doc(db, DB_COLLECTION_USERS, currentUser.uid), {
          displayName: username,
          photoURL: avatars[avatarIndex],
        });
        navigate(ROUTE_CHAT);
      } catch (e: any) {
        showAlert("Failed to update your profile.", AlertType.error);
      }
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <FirechatLogo className="h-14 w-14" />
      <h1 className="mx-auto text-3xl font-semibold">Welcome!</h1>
      <h2 className="mx-auto mt-2 text-xl">
        Set a display name and pick an avatar to get started
      </h2>
      <form className="form-control mt-4 space-y-2" onSubmit={handleSubmit}>
        <input
          id="username"
          name="username"
          autoComplete="name"
          required
          className="input w-full grow input-bordered input-md text-2xl font-extrabold placeholder:font-normal"
          placeholder="Enter a display name"
          defaultValue={currentUser.displayName && currentUser.displayName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="text-center flex items-end justify-center gap-4">
              <h2 className="text-xl text-center leading-10 tracking-tight">
                Regenerate avatars
              </h2>
              <button
                className="btn btn-ghost btn-circle btn-sm"
                onClick={fetchAvatars}
              >
                <ArrowPathRoundedSquareIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
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
              <div>
                <button
                  className="w-full btn btn-primary"
                  disabled={username === "" || avatarIndex === undefined}
                >
                  Let&apos;s go!
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
