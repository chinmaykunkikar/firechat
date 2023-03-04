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
    <div className="flex gap-3" onClick={handleSelect}>
      <div>
        <div className="avatar">
          <div className="w-8 rounded-full">
            <Avvvatars value={user?.uid} style="shape" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">{user?.displayName}</div>
      </div>
    </div>
  );
}
