import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Filter,
  GitCompare,
  MapPin,
  Scale,
  Search,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { StarRating } from "@/components/ui/StarRating";
import { formatFees, formatPackage } from "@/lib/utils";
import type { CollegeCard } from "@/types/college";

interface CollegesApiResponse {
  colleges: CollegeCard[];
}

async function fetchTopColleges(): Promise<CollegeCard[] | null> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const url = new URL("/api/colleges", baseUrl);
  url.searchParams.set("sort", "rating");
  url.searchParams.set("limit", "3");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as CollegesApiResponse;
    return data.colleges;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const topColleges = await fetchTopColleges();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Star className="h-4 w-4 text-blue-600" />
              <span>India&apos;s  smartest college discovery platform</span>
            </div>

            <h1 className="mt-6 text-5xl font-extrabold text-gray-900 md:text-6xl">
              Find Your{" "}
              <span className="text-blue-600">Perfect College</span>
            </h1>

            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              Discover the right fit using filters, ratings, packages, and
              location—made simple.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/colleges"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
              >
                <Search className="h-4 w-4" />
                Explore Colleges
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-600 bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
              >
                <GitCompare className="h-4 w-4" />
                Compare Now
              </Link>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Try searching for &quot;IIT&quot;, &quot;MBA&quot;...
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <BookOpen className="h-6 w-6 text-brand-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">28+</p>
              <p className="text-sm font-medium text-gray-500">Colleges Listed</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <MapPin className="h-6 w-6 text-brand-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">15+</p>
              <p className="text-sm font-medium text-gray-500">Cities Covered</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <Users className="h-6 w-6 text-brand-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-sm font-medium text-gray-500">Free to Use</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <Trophy className="h-6 w-6 text-brand-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.5★</p>
              <p className="text-sm font-medium text-gray-500">
                Avg Top Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-600">
              A smarter way to shortlist colleges—faster and with more clarity.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative rounded-2xl bg-white p-7">
              <div className="absolute -left-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                1
              </div>
              <div className="flex items-center gap-3 text-blue-600">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Filter className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Search</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Find colleges by name, city, fees, and rating filters.
              </p>
            </div>

            <div className="relative rounded-2xl bg-white p-7">
              <div className="absolute -left-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
                2
              </div>
              <div className="flex items-center gap-3 text-purple-600">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Compare</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Compare up to 3 colleges side by side with detailed metrics.
              </p>
            </div>

            <div className="relative rounded-2xl bg-white p-7">
              <div className="absolute -left-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                3
              </div>
              <div className="flex items-center gap-3 text-green-600">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Decide</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Make informed decisions with real data and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Top Rated Colleges
            </h2>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand-600 transition hover:bg-blue-50 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topColleges && topColleges.length === 3 ? (
              topColleges.map((college) => (
                <Link
                  key={college.id}
                  href={`/colleges/${college.id}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
                      {college.image ? (
                        <Image
                          src={college.image}
                          alt={college.name}
                          width={600}
                          height={400}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                          <span className="text-4xl font-bold text-gray-500">
                            {college.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-brand-600">
                      {college.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>
                        {college.city}, {college.state}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-gray-800">
                        {formatFees(college.fees)}
                      </p>
                      <div className="text-right">
                        <StarRating rating={college.rating} size="sm" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-green-700">
                        {formatPackage(college.avgPackage)}
                      </p>
                      <Badge type={college.type} />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white"
                >
                  <div className="aspect-video bg-gray-200" />
                  <div className="p-5">
                    <Skeleton className="h-5 w-4/5 rounded" />
                    <Skeleton className="mt-3 h-4 w-2/3 rounded" />
                    <Skeleton className="mt-4 h-4 w-3/4 rounded" />
                    <Skeleton className="mt-3 h-4 w-2/3 rounded" />
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Skeleton className="h-4 w-2/5 rounded" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-4xl font-extrabold text-white">
                Ready to find your college?
              </p>
              <p className="mt-2 text-blue-100">
                Start your journey to the perfect institution today
              </p>
            </div>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Start Exploring
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">CF</span>
            </div>
            <span className="text-lg font-bold text-white">CollegeFind</span>
          </div>

          <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/colleges"
              className="text-sm text-gray-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
            >
              Colleges
            </Link>
            <Link
              href="/compare"
              className="text-sm text-gray-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
            >
              Compare
            </Link>
            <Link
              href="/predictor"
              className="text-sm text-gray-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
            >
              Predictor
            </Link>
          </nav>

          <p className="text-sm font-medium text-gray-300">
            Making college decisions easier 🎓
          </p>
        </div>
      </footer>
    </div>
  );
}
