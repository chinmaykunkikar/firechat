import Modal from "@components/Modal";
import { ChatContext } from "@contexts/ChatContext";
import { MouseEvent, useContext } from "react";

type Props = {
  open: boolean;
  handleToggle: () => void;
  deleteChat: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function DeleteChatModal({
  open,
  handleToggle,
  deleteChat,
}: Props) {
  const { data }: any = useContext(ChatContext);

  return (
    <Modal open={open} onClose={handleToggle}>
      <p className="text-lg font-bold">Delete this chat?</p>
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
