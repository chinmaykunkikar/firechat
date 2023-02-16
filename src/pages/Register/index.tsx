import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { auth, storage } from "../../firebase";

export default function Register() {
  const [error, setError] = useState<boolean>(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const displayName: string = e.target[0].value;
    const email: string = e.target[1].value;
    const password: string = e.target[2].value;
    const avatar: Blob = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      uploadTask.on(
        "state_changed",
        (error: any) => setError(true),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL: string) => {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
            }
          );
        }
      );
    } catch (error) {
      setError(true);
      console.log(error);
    }
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
          <button className="btn-primary btn-wide btn mt-2">Sign up</button>
          {error && <div className="text-error">Something went wrong.</div>}
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="#" className="link-secondary link font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
