import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db, googleProvider } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import { AlertType, handleFirebaseError, showAlert } from "@/utils";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirechatLogo from "@components/FirechatLogo";
import GoogleLogo from "@components/GoogleLogo";

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function signUpWithGoogle() {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        showAlert("Creating your Firechat account…", AlertType.info);
        const displayName = res.user.displayName;
        const email = res.user.email;
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
        });
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/chat");
        setLoading(false);
      })
      .catch((error) => {
        handleFirebaseError(error);
        setLoading(false);
      });
  }

  async function handleSubmit(e: any) {
    setLoading(true);
    e.preventDefault();
    showAlert("Creating your Firechat account…", AlertType.info);
    const displayName: string = e.target[0].value;
    const email: string = e.target[1].value;
    const password: string = e.target[2].value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });
      await setDoc(doc(db, "userChats", res.user.uid), {});
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat");
      setLoading(false);
    } catch (error: any) {
      handleFirebaseError(error);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen cursor-default flex-col items-center justify-center bg-base-300 ">
      <div className="card flex w-1/3 flex-col bg-base-100">
        <div className="card-body">
          <div className="flex justify-center">
            <FirechatLogo className="h-14 w-14" />
          </div>
          <div className="mx-auto mb-4 text-lg font-bold">
            Create your Firechat account
          </div>
          <form
            className="form-control flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
          >
            <div className="w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your name?</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Amit Sharma"
                autoComplete="name"
                className="input-bordered input w-full max-w-xs"
                required
              />
            </div>
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
                <span className="label-text">Enter a password</span>
              </label>
              <input
                type="password"
                placeholder="e.g. ******** (min. 6 characters)"
                autoComplete="new-password"
                id="new-password"
                className="input-bordered input w-full max-w-xs"
                required
              />
            </div>
            <button
              className="btn-primary btn-wide btn mt-2"
              disabled={loading}
            >
              Sign up
            </button>
            <button
              className="btn-wide btn gap-2"
              disabled={loading}
              onClick={signUpWithGoogle}
            >
              <GoogleLogo className="h-4 w-4" />
              Sign up with Google
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="link-secondary link font-semibold">
              Login
            </Link>
          </p>
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
