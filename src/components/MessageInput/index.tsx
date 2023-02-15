import {
  ArrowRightIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function MessageInput() {
  return (
    <div>
      <div className="flex h-16 items-center justify-center gap-4 bg-neutral-focus px-4">
        <input
          type="text"
          placeholder="Message"
          className="input-ghost input w-full grow p-0 focus:bg-transparent focus:outline-none"
        />
        <div className="btn-square btn-ghost btn-sm btn">
          <PaperClipIcon />
        </div>
        <div className="btn-square btn-ghost btn-sm btn">
          <PhotoIcon />
        </div>
        <button className="btn-primary btn-sm btn-circle btn basis-24 text-base-content">
          <ArrowRightIcon className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
