import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db, storage } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import { AlertType, showAlert } from "@/utils/ShowAlert";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    setLoading(true);
    e.preventDefault();
    showAlert("Creating your Firechat account…", AlertType.info);
    const displayName: string = e.target[0].value;
    const email: string = e.target[1].value;
    const password: string = e.target[2].value;
    const avatar: Blob = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setLoading(false);
            navigate("/login");
          } catch (error: any) {
            showAlert(error.message, AlertType.error);
          }
        });
      });
    } catch (error: any) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        showAlert("This email is already in use.", AlertType.error);
      } else if (errorCode === "auth/invalid-email") {
        showAlert("This email is invalid.", AlertType.error);
      } else if (errorCode === "auth/weak-password") {
        showAlert("Password should be at least 6 characters", AlertType.error);
      } else if (errorCode === "auth/operation-not-allowed") {
        showAlert(
          "Unexpected error. Please contact the maintainer to resolve this issue.",
          AlertType.error
        );
      } else {
        showAlert(errorMessage, AlertType.error);
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8">
      <div className="card flex w-1/3 flex-col rounded-3xl bg-base-300 p-8">
        <div className="mx-auto mb-2 text-3xl font-bold">Fire Chat</div>
        <div className="mx-auto mb-4">Create a new account</div>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Amit Sharma"
              autoComplete="name"
              className="input-bordered input w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <input
              type="text"
              placeholder="e.g. sharmaamit@elite.club"
              autoComplete="email"
              className="input-bordered input w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Enter a password</span>
            </label>
            <input
              type="password"
              placeholder="e.g. ********"
              autoComplete="new-password"
              className="input-bordered input w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick an avatar</span>
            </label>
            <input
              type="file"
              className="file-input-bordered file-input-accent file-input w-full max-w-xs"
            />
          </div>
          <button className="btn-primary btn-wide btn mt-2" disabled={loading}>
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="link-secondary link font-semibold">
            Login
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
