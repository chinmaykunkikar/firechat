export default function Register() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8">
      <div className="card flex w-1/3 flex-col rounded-3xl bg-base-300 p-8">
        <div className="mx-auto mb-2 text-3xl font-bold">Fire Chat</div>
        <div className="mx-auto mb-4">Create a new account</div>
        <form className="flex flex-col items-center gap-4">
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
