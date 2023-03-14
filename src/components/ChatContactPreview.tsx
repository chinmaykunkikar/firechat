import Avvvatars from "avvvatars-react";
import { DocumentData } from "firebase/firestore";

type ChatContactPreviewProps = {
  handleSearchSelect: (user: DocumentData | undefined) => void;
  user: DocumentData;
};

export default function ChatContactPreview({
  user,
  handleSearchSelect,
}: ChatContactPreviewProps) {
  return (
    <div
      className="flex items-center gap-4 p-4 hover:cursor-pointer hover:bg-neutral active:bg-neutral-focus"
      onClick={() => handleSearchSelect(user)}
    >
      <div className="w-12 rounded-full">
        <Avvvatars value={user?.uid} style="shape" size={48} />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">{user?.displayName}</div>
      </div>
    </div>
  );
}
