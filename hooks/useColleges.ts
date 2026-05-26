"use client";

import { useQuery } from "@tanstack/react-query";
import { DEFAULT_FILTERS, type CollegeFilters } from "@/types/filters";
import type { CollegeCard, PaginatedColleges } from "@/types/college";

export interface UseCollegesReturn {
  colleges: CollegeCard[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch: () => void;
}

/**
 * Builds query string from filters, skipping empty and default values.
 */
function buildCollegesQueryString(filters: CollegeFilters): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }
  if (filters.city) {
    params.set("city", filters.city);
  }
  if (filters.minFees > DEFAULT_FILTERS.minFees) {
    params.set("minFees", String(filters.minFees));
  }
  if (filters.maxFees < DEFAULT_FILTERS.maxFees) {
    params.set("maxFees", String(filters.maxFees));
  }
  if (filters.minRating > DEFAULT_FILTERS.minRating) {
    params.set("minRating", String(filters.minRating));
  }
  if (filters.type) {
    params.set("type", filters.type);
  }

  params.set("page", String(filters.page));
  params.set("limit", String(filters.limit));
  params.set("sort", filters.sort);

  return params.toString();
}

async function fetchColleges(
  filters: CollegeFilters
): Promise<PaginatedColleges> {
  const query = buildCollegesQueryString(filters);
  const response = await fetch(`/api/colleges?${query}`);

  if (!response.ok) {
    const body = (await response.json()) as { error?: string };
    throw new Error(body.error ?? "Failed to fetch colleges");
  }

  return response.json() as Promise<PaginatedColleges>;
}

export function useColleges(filters: CollegeFilters): UseCollegesReturn {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["colleges", filters],
    queryFn: () => fetchColleges(filters),
    staleTime: 30000,
  });

  return {
    colleges: data?.colleges ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    isError,
    isFetching,
    refetch: () => {
      void refetch();
    },
  };
}
