import AvatarPicker from "@components/AvatarPicker";
import ProfileSummary from "@components/ProfileSummary";
import { UserProfileContext } from "@contexts/UserProfileContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";

export default function UserProfile() {
  const { toggleIsOpen }: any = useContext(UserProfileContext);

  const [picker, setPicker] = useState<boolean>(false);

  return (
    <div className="h-full cursor-default">
      {picker ? (
        <AvatarPicker picker={picker} setPicker={setPicker} />
      ) : (
        <>
          <button
            className="btn btn-ghost btn-circle btn-sm m-2"
            onClick={() => toggleIsOpen()}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <ProfileSummary picker={picker} setPicker={setPicker} />
        </>
      )}
    </div>
  );
}
