import { auth, db, googleProvider } from "@/firebase";
import { AlertType, handleFirebaseError, showAlert } from "@/utils";
import {
  DB_COLLECTION_USERS,
  ROUTE_CHAT,
  ROUTE_ONBOARDING,
} from "@/utils/constants";
import { createUserDocs } from "@/utils/firebaseFns";
import GoogleLogo from "@components/GoogleLogo";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        getDoc(doc(db, DB_COLLECTION_USERS, res.user.uid))
          .then(async (docSnap) => {
            if (docSnap.exists()) navigate(ROUTE_CHAT);
            else {
              showAlert("Creating your Firechat account…", AlertType.info);
              const { displayName, email, uid } = res.user;
              createUserDocs({ uid, displayName, email });
              navigate(ROUTE_ONBOARDING);
            }
          })
          .catch((error) => {
            handleFirebaseError(error);
          });
      })
      .catch((error) => {
        handleFirebaseError(error);
      });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(ROUTE_CHAT);
    } catch (error: any) {
      handleFirebaseError(error);
    }
  }

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
          <div className="w-full max-w-xs">
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
          <button type="submit" className="btn-primary btn-wide btn mt-2">
            Login
          </button>
        </form>
        <button
          className="btn-wide btn mx-auto gap-2"
          onClick={signInWithGoogle}
        >
          <GoogleLogo className="h-4 w-4" />
          Continue with Google
        </button>
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
    </div>
  );
}
