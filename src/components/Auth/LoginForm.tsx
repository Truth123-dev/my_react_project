import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "../../schemas/LoginSchema";
import type { LoginData } from "../../types/auth";
import { login as loginRequest } from "../../services/authService";
import { useAuth } from "../../context/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginData) {
    setSubmitError("");

    try {
      const user = await loginRequest(values);
      login(user);
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to login";
      toast.error(message);
      setSubmitError(message);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4
           py-3 text-slate-900
            outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>

      <div className="flex items-center rounded justify-between text-sm text-slate-600">
        <Link to="/forgot-password" className="hover:text-indigo-700">
          Forgot password?
        </Link>
        <Link
          to="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Create account
        </Link>
      </div>
    </form>
  );
}
