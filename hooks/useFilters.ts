"use client";

import { useCallback, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  filtersToSearchParams,
  getActiveFilterCount,
  isFilteringActive,
} from "@/lib/filters-url";
import { parseCollegeQueryParams } from "@/lib/parse-college-query";
import type { CollegeFilters } from "@/types/filters";

export interface UseFiltersReturn {
  filters: CollegeFilters;
  setFilter: <K extends keyof CollegeFilters>(
    key: K,
    value: CollegeFilters[K]
  ) => void;
  resetFilters: () => void;
  isFiltering: boolean;
  activeFilterCount: number;
}

export function useFilters(): UseFiltersReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filters = useMemo(
    () => parseCollegeQueryParams(searchParams),
    [searchParams]
  );

  const pushFilters = useCallback(
    (nextFilters: CollegeFilters) => {
      const params = filtersToSearchParams(nextFilters);
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const setFilter = useCallback(
    <K extends keyof CollegeFilters>(key: K, value: CollegeFilters[K]) => {
      const applyFilter = () => {
        const nextFilters: CollegeFilters = {
          ...filters,
          [key]: value,
          page: key === "page" ? (value as number) : 1,
        };
        pushFilters(nextFilters);
      };

      if (key === "search") {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(applyFilter, 300);
        return;
      }

      applyFilter();
    },
    [filters, pushFilters]
  );

  const resetFilters = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const isFiltering = useMemo(() => isFilteringActive(filters), [filters]);
  const activeFilterCount = useMemo(
    () => getActiveFilterCount(filters),
    [filters]
  );

  return {
    filters,
    setFilter,
    resetFilters,
    isFiltering,
    activeFilterCount,
  };
}
