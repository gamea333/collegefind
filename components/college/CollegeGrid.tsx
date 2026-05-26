"use client";

import { AlertCircle, Search } from "lucide-react";
import { CollegeCard } from "@/components/college/CollegeCard";
import { CollegeCardSkeleton } from "@/components/college/CollegeCardSkeleton";
import type { CollegeCard as CollegeCardType } from "@/types/college";

interface CollegeGridProps {
  colleges: CollegeCardType[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  savedIds: string[];
  isLoggedIn: boolean;
  onSave: (id: string) => void;
  onRetry: () => void;
}

export function CollegeGrid({
  colleges,
  isLoading,
  isFetching,
  isError,
  savedIds,
  isLoggedIn,
  onSave,
  onRetry,
}: CollegeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <CollegeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white py-16 text-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          Failed to load colleges
        </h3>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white py-16 text-center">
        <Search className="h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          No colleges found
        </h3>
        <p className="mt-2 text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isFetching && (
        <div className="mb-4 rounded-lg bg-blue-50 px-4 py-2 text-center text-sm font-medium text-brand-600">
          Updating results...
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            isSaved={savedIds.includes(college.id)}
            onSave={onSave}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  );
}
