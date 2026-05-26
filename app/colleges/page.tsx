"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CollegeFilters } from "@/components/college/CollegeFilters";
import { CollegeGrid } from "@/components/college/CollegeGrid";
import { Pagination } from "@/components/college/Pagination";
import { useColleges } from "@/hooks/useColleges";
import { useFilters } from "@/hooks/useFilters";
import { useSaved } from "@/hooks/useSaved";
import { SORT_OPTIONS } from "@/types/filters";
import { ActiveFilterChips } from "@/components/college/ActiveFilterChips";
import { RecentlyViewed } from "@/components/college/RecentlyViewed";

export default function CollegesPage() {
  const { status } = useSession();
  const { filters, setFilter, activeFilterCount, isFiltering } = useFilters();
  const {
    colleges,
    total,
    totalPages,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useColleges(filters);
  const { savedIds, toggleSave } = useSaved();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const isLoggedIn = status === "authenticated";
  const showingText = isLoading
    ? "Loading colleges..."
    : `Showing ${total} college${total !== 1 ? "s" : ""}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-24">
      <div className="flex gap-6">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <CollegeFilters />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={`text-sm ${
                isLoading ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {showingText}
            </p>
            <div className="flex items-center gap-3">
              <select
                value={filters.sort}
                onChange={(event) =>
                  setFilter("sort", event.target.value as typeof filters.sort)
                }
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
                aria-label="Sort colleges"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-600 px-1.5 text-xs font-medium text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {!isFiltering && <RecentlyViewed />}

          <ActiveFilterChips />

          <CollegeGrid
            colleges={colleges}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            savedIds={savedIds}
            isLoggedIn={isLoggedIn}
            onSave={(id) => {
              void toggleSave(id);
            }}
            onRetry={refetch}
          />

          <Pagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => setFilter("page", page)}
          />
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsFilterOpen(false)}
            aria-label="Close filter overlay"
          />
          <div className="absolute bottom-0 left-0 top-0 w-[min(320px,85vw)] overflow-y-auto bg-white p-5 shadow-xl">
            <CollegeFilters onClose={() => setIsFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
