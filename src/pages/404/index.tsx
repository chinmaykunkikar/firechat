import { HomeIcon } from "@heroicons/react/24/outline";

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base-content">
      <p className="font-mono text-9xl text-base-100">404</p>
      <p className="text-2xl text-base-100">
        Seems like you've lost your way on this adventure.
      </p>
      <button className="btn-ghost btn-square btn mt-8">
        <HomeIcon className="stroke-base-100 p-1" />
      </button>
      <p className="text-base-100">
        Let's teleport you back to home for safety.
      </p>
    </div>
  );
}
