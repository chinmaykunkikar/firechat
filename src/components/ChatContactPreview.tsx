import Avvvatars from "avvvatars-react";
import { DocumentData } from "firebase/firestore";

type ChatContactPreviewProps = {
  handleSearchSelect?: React.MouseEventHandler<HTMLDivElement> | undefined;
  user?: DocumentData;
};

export default function ChatContactPreview({
  user,
  handleSearchSelect: handleSelect,
}: ChatContactPreviewProps) {
  return (
    <div
      className="flex items-center gap-4 p-4 hover:cursor-pointer hover:bg-neutral active:bg-neutral-focus"
      onClick={handleSelect}
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
