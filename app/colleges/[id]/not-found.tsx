import Link from "next/link";

export default function CollegeNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">College not found</h1>
      <p className="mt-2 text-gray-600">
        The college you are looking for does not exist or may have been removed.
      </p>
      <Link
        href="/colleges"
        className="mt-6 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
      >
        Browse Colleges
      </Link>
    </div>
  );
}
