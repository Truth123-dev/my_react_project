import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
            <p className="mt-2 text-slate-600">
              Manage your account details and session.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Email
              </p>
              <p className="mt-2 text-base font-medium text-slate-900">
                {user.email}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                User ID
              </p>
              <p className="mt-2 break-all text-base font-medium text-slate-900">
                {user.id}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Token
            </p>
            <p className="mt-2 break-all text-sm text-slate-700">
              {user.token}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-full justify-center rounded-2xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700 sm:w-auto"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
