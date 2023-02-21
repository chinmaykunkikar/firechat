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
          <div className="w-12 rounded-full bg-neutral-focus font-semibold text-neutral-content">
            <img src={user?.photoURL} alt={user?.displayName} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">{user?.displayName}</div>
        <div className="text-neutral-content">Hello</div>
      </div>
    </div>
  );
}
