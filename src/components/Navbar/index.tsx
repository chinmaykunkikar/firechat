import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <div className="flex h-16 select-none items-center justify-between bg-secondary px-4">
      <span className="text-xl font-semibold">Fire Chat</span>
      <div className="flex items-center justify-center gap-2">
        <div>
          <div className="placeholder avatar">
            <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
              <span className="text-sm font-semibold">ck</span>
            </div>
          </div>
        </div>
        <div className="font-semibold">Chinmay Kunkikar</div>
        <button className="btn-square btn-ghost btn-xs btn">
          <ArrowRightOnRectangleIcon />
        </button>
      </div>
    </div>
  );
}
