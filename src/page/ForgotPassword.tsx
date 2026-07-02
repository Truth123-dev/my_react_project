import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      email
        ? `If ${email} is registered, password reset instructions have been sent.`
        : "Enter your email to receive reset instructions.",
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">
            Forgot password
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            We’ll help you reset your account password.
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="you@example.com"
            />
          </div>

          {message && <p className="text-sm text-slate-600">{message}</p>}

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-700"
          >
            Send reset link
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
