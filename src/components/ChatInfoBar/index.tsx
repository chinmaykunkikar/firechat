export default function ChatInfoBar() {
  return (
    <div>
      <div className="flex h-16 select-none items-center justify-between bg-secondary-focus px-6">
        <div className="text-lg font-semibold">Ayush Swamy</div>
        <button className="btn-ghost btn-square btn-sm btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="h-6 w-6"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
