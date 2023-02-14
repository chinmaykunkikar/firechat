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
        <button className="btn-ghost btn-square btn-xs btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
