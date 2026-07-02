import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
            <p className="mt-2 text-slate-600">Welcome back, {user?.email}.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              View profile
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Open home
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Authentication status
            </h2>
            <p className="mt-2 text-slate-600">
              You are signed in and your routes are protected.
            </p>
          </div>yes do the backec
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Protected pages
            </h2>
            <p className="mt-2 text-slate-600">
              Try visiting the profile page or refreshing the browser.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Local mock auth
            </h2>
            <p className="mt-2 text-slate-600">
              This demo stores users locally and preserves sessions across
              reloads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
