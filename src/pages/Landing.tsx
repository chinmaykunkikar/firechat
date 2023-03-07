import Login from "@components/Login";
import { Slide, ToastContainer } from "react-toastify";

export default function Landing() {
  return (
    <div className="hero min-h-screen cursor-default bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Firechat</h1>
          <p className="py-6">Welcome to firechat</p>
        </div>
        <Login />
      </div>
      <ToastContainer
        theme="colored"
        position="top-right"
        transition={Slide}
        autoClose={5000}
        hideProgressBar
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
}
