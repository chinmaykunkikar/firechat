import { auth } from "@/firebase";
import { AlertType, showAlert } from "@/utils/ShowAlert";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/invalid-email") {
        showAlert("This email is invalid.", AlertType.error);
      } else if (errorCode === "auth/user-disabled") {
        showAlert("This user is disabled.", AlertType.error);
      } else if (errorCode === "auth/user-not-found") {
        showAlert("User not found.", AlertType.error);
      } else if (errorCode === "auth/wrong-password") {
        showAlert("The password is incorrect.", AlertType.error);
      } else {
        showAlert(errorMessage, AlertType.error);
      }
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8">
      <div className="card flex w-1/3 flex-col rounded-3xl bg-base-300 p-8">
        <div className="mx-auto mb-2 text-3xl font-bold">Fire Chat</div>
        <div className="mx-auto mb-4">Log into your account</div>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <input
              type="text"
              placeholder="e.g. sharmaamit@elite.club"
              autoComplete="email"
              className="input-bordered input w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter your password</span>
            </label>
            <input
              type="password"
              placeholder="e.g. ********"
              autoComplete="current-password"
              id="current-password"
              className="input-bordered input w-full max-w-xs"
              required
            />
          </div>
          <button className="btn-primary btn-wide btn mt-2">Login</button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="link-secondary link font-semibold">
            Register
          </Link>
        </p>
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
