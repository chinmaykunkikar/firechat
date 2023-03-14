import cn from "classnames";
import React, { useRef } from "react";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose(): void;
};

const Modal = ({ children, open, onClose }: Props) => {
  const ref = useRef(null);

  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });
  return (
    <div className={modalClass}>
      <div className="modal-box" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
