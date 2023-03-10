import { auth } from "@/firebase";
import { AlertType, showAlert } from "@/utils";
import FirechatLogo from "@components/FirechatLogo";
import Login from "@components/Login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

export default function Landing() {
  const navigate = useNavigate();

  const { VITE_DEMO_USER_EMAIL, VITE_DEMO_USER_PASSWORD } = import.meta.env;

  const handleDemo = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        VITE_DEMO_USER_EMAIL,
        VITE_DEMO_USER_PASSWORD
      );
      navigate("/chat");
    } catch (error: any) {
      let errorMessage = error.message;
      showAlert(errorMessage, AlertType.error);
    }
  };

  return (
    <div className="cursor-default bg-base-300">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col gap-4 lg:flex-row">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2">
              <FirechatLogo className="h-16 w-16" />
              <h1 className="mb-4 text-5xl font-bold">Firechat</h1>
            </div>
            <p className="mb-2 text-2xl">
              Introducing Firechat, a modern messaging app built with ReactJS,
              TailwindCSS, and Firebase. Firechat provides a fast and intuitive
              platform for seamless communication.
            </p>
            <p className="mb-1 text-lg">
              Once logged in, users can access the chats screen and send and
              receive messages in real-time. It offers a solid foundation for
              secure and streamlined communication.
            </p>
            <div className="mt-8 flex h-32 items-center justify-evenly gap-4 ">
              <button className="btn" onClick={handleDemo}>
                Login with a demo account
              </button>
              <div className="divider divider-horizontal">OR</div>
              <button
                className="btn-secondary btn"
                onClick={() => navigate("/register")}
              >
                Sign up now
              </button>
            </div>
          </div>
          <Login />
        </div>
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
