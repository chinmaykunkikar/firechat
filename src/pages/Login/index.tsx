export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8">
      <div className="card flex w-1/3 flex-col rounded-3xl bg-base-300 p-8">
        <div className="mx-auto mb-2 text-3xl font-bold">Fire Chat</div>
        <div className="mx-auto mb-4">Log into your account</div>
        <form className="flex flex-col items-center gap-4">
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
              <span className="label-text">Enter your password</span>
            </label>
            <input
              type="password"
              placeholder="e.g. ********"
              className="input-bordered input w-full max-w-xs"
            />
          </div>
          <button className="btn-primary btn-wide btn mt-2">Login</button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="#" className="link-secondary  link font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
