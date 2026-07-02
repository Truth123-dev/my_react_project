import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export default function AuthLayout({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-4xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">
            Secure authentication for your app.
          </p>
        </div>

        {children}

        <div className="mt-6 text-sm text-slate-600 text-center">
          <span>{footerText} </span>
          <Link
            to={footerLinkHref}
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            {footerLinkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
