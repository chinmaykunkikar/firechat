import Modal from "@components/Modal";
import { ChatContext } from "@contexts/ChatContext";
import Avvvatars from "avvvatars-react";
import { MouseEvent, useContext } from "react";

type Props = {
  open: boolean;
  handleToggle: () => void;
  deleteChat: (e: MouseEvent<HTMLButtonElement>) => void;
};
const { data }: any = useContext(ChatContext);

export default function DeleteChatModal({
  open,
  handleToggle,
  deleteChat,
}: Props) {
  return (
    <Modal open={open} onClose={handleToggle}>
      <div className="flex items-center gap-2 text-lg font-bold">
        <Avvvatars value={data.user.uid} style="shape" size={36} />
        Delete this chat?
      </div>
      <p className="py-2">
        <span className="font-bold">{data.user.displayName}</span>
        &nbsp;will lose this chat too.
      </p>
      <p className="font-bold text-warning">This cannot be undone.</p>
      <div className="modal-action">
        <button className="btn-primary btn" onClick={handleToggle}>
          Cancel
        </button>
        <button className="btn-outline btn-error btn" onClick={deleteChat}>
          Delete Chat
        </button>
      </div>
    </Modal>
  );
}
