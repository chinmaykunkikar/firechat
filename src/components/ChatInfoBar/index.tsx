import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export default function ChatInfoBar() {
  return (
    <div>
      <div className="flex h-16 select-none items-center justify-between bg-secondary-focus px-6">
        <div className="text-lg font-semibold">Ayush Swamy</div>
        <button className="btn-ghost btn-square btn-sm btn">
          <EllipsisVerticalIcon />
        </button>
      </div>
    </div>
  );
}
