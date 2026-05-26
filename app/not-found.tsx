import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-full max-w-xl">
        <div className="select-none text-9xl font-extrabold leading-none text-blue-600">
          404
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Page not found
        </h1>
        <p className="mt-3 text-gray-500">
          The page you're looking for doesn't exist.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/colleges"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
          >
            <Search className="h-4 w-4" />
            Browse Colleges
          </Link>
        </div>
      </div>
    </div>
  );
}

