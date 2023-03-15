import { ROUTE_HOME } from "@/utils/constants";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base-content">
      <p className="font-mono text-9xl text-base-100">404</p>
      <p className="text-2xl text-base-100">
        Seems like you've lost your way on this adventure.
      </p>
      <Link to={ROUTE_HOME} className="btn-ghost btn-square btn mt-8">
        <HomeIcon className="stroke-base-100 p-1" />
      </Link>
      <p className="text-base-100">
        Let's teleport you back to home for safety.
      </p>
    </div>
  );
}
