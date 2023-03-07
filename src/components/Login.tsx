import { auth } from "@/firebase";
import { AlertType, showAlert } from "@/utils/ShowAlert";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { VITE_DEMO_USER_EMAIL, VITE_DEMO_USER_PASSWORD } = import.meta.env;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat");
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
    <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">
        <div className="mx-auto mb-2 text-3xl font-bold">Hello!</div>
        <div className="mx-auto mb-4">Log into your account</div>
        <form
          className="form-control flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-xs">
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
          <div className="mt-2 flex flex-col gap-4">
            <button type="submit" className="btn-primary btn-wide btn">
              Login
            </button>
            <button
              className="btn-outline btn-primary btn"
              onClick={handleDemo}
            >
              Demo login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="link-secondary link font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
