"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export function RecentlyViewed() {
  const recentList = useRecentlyViewed((state) => state.recentList);

  if (recentList.length === 0) {
    return null;
  }

  return (
    <section className="mb-4">
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-gray-500" />
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Recently Viewed
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {recentList.map((college) => (
          <Link
            key={college.id}
            href={`/colleges/${college.id}`}
            className="flex min-w-[200px] items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {college.image ? (
                <Image
                  src={college.image}
                  alt={college.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                  <span className="text-sm font-bold text-white">
                    {college.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-medium text-gray-900">
                {college.name}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">
                  {college.city}, {college.state}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
