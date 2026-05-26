import { DEFAULT_FILTERS, type CollegeFilters } from "@/types/filters";

/**
 * Converts CollegeFilters to URLSearchParams, omitting default values.
 */
export function filtersToSearchParams(filters: CollegeFilters): URLSearchParams {
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
  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }
  if (filters.limit !== DEFAULT_FILTERS.limit) {
    params.set("limit", String(filters.limit));
  }
  if (filters.sort !== DEFAULT_FILTERS.sort) {
    params.set("sort", filters.sort);
  }

  return params;
}

/**
 * Returns true if any filter differs from defaults.
 */
export function isFilteringActive(filters: CollegeFilters): boolean {
  return getActiveFilterCount(filters) > 0;
}

/**
 * Counts filters that differ from default values.
 */
export function getActiveFilterCount(filters: CollegeFilters): number {
  let count = 0;

  if (filters.search !== DEFAULT_FILTERS.search) count += 1;
  if (filters.city !== DEFAULT_FILTERS.city) count += 1;
  if (filters.minFees !== DEFAULT_FILTERS.minFees) count += 1;
  if (filters.maxFees !== DEFAULT_FILTERS.maxFees) count += 1;
  if (filters.minRating !== DEFAULT_FILTERS.minRating) count += 1;
  if (filters.type !== DEFAULT_FILTERS.type) count += 1;
  if (filters.sort !== DEFAULT_FILTERS.sort) count += 1;
  if (filters.page !== DEFAULT_FILTERS.page) count += 1;
  if (filters.limit !== DEFAULT_FILTERS.limit) count += 1;

  return count;
}
