import type { Prisma } from "@prisma/client";
import { DEFAULT_FILTERS, type CollegeFilters, type SortOption } from "@/types/filters";

const SORT_VALUES: SortOption[] = [
  "rating",
  "fees_asc",
  "fees_desc",
  "package",
];

function parsePositiveInt(value: string | null, fallback: number): number {
  if (!value) {
    return fallback;
  }
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }
  return parsed;
}

function parsePositiveFloat(
  value: string | null,
  fallback: number,
  min: number,
  max: number
): number {
  if (!value) {
    return fallback;
  }
  const parsed = parseFloat(value);
  if (Number.isNaN(parsed) || parsed < min) {
    return fallback;
  }
  return Math.min(parsed, max);
}

/**
 * Parses and validates college list query parameters from a URLSearchParams object.
 */
export function parseCollegeQueryParams(
  searchParams: URLSearchParams
): CollegeFilters {
  const page = Math.max(1, parsePositiveInt(searchParams.get("page"), 1));
  const limit = Math.min(
    50,
    Math.max(1, parsePositiveInt(searchParams.get("limit"), DEFAULT_FILTERS.limit))
  );

  const minFees = parsePositiveInt(
    searchParams.get("minFees"),
    DEFAULT_FILTERS.minFees
  );
  const maxFees = parsePositiveInt(
    searchParams.get("maxFees"),
    DEFAULT_FILTERS.maxFees
  );

  const minRating = parsePositiveFloat(
    searchParams.get("minRating"),
    DEFAULT_FILTERS.minRating,
    0,
    5
  );

  const sortParam = searchParams.get("sort");
  const sort: SortOption = SORT_VALUES.includes(sortParam as SortOption)
    ? (sortParam as SortOption)
    : DEFAULT_FILTERS.sort;

  return {
    search: searchParams.get("search")?.trim() ?? "",
    city: searchParams.get("city")?.trim() ?? "",
    minFees: minFees >= 0 ? minFees : 0,
    maxFees: maxFees > 0 ? maxFees : DEFAULT_FILTERS.maxFees,
    minRating,
    type: searchParams.get("type")?.trim() ?? "",
    page,
    limit,
    sort,
  };
}

/**
 * Builds a Prisma where clause from validated college filters.
 */
export function buildCollegeWhereClause(
  filters: CollegeFilters
): Prisma.CollegeWhereInput {
  const where: Prisma.CollegeWhereInput = {
    fees: {
      gte: filters.minFees,
      lte: filters.maxFees,
    },
  };

  if (filters.search) {
    where.name = { contains: filters.search, mode: "insensitive" };
  }

  if (filters.city) {
    where.city = { equals: filters.city };
  }

  if (filters.minRating > 0) {
    where.rating = { gte: filters.minRating };
  }

  if (filters.type) {
    where.type = { equals: filters.type };
  }

  return where;
}
