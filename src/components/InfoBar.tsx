import { useContext } from "react";
import { ChatContext } from "@/contexts/ChatContext";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Avvvatars from "avvvatars-react";

export default function InfoBar() {
  const { data }: any = useContext(ChatContext);

  return (
    <div>
      <div className="flex h-16 select-none items-center justify-between bg-secondary-focus px-6">
        <div className="flex items-center gap-4">
          <Avvvatars value={data?.user?.uid} style="shape" />
          <div className="text-lg font-semibold">{data.user?.displayName}</div>
        </div>
        <button className="btn-ghost btn-square btn-sm btn">
          <EllipsisVerticalIcon />
        </button>
      </div>
    </div>
  );
}
