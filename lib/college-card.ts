import type { Prisma } from "@prisma/client";
import type { SortOption } from "@/types/filters";
import type { College, CollegeCard } from "@/types/college";

/**
 * Maps a full college record (or compatible shape) to CollegeCard fields.
 */
export function toCollegeCard(
  college: Pick<
    College,
    | "id"
    | "name"
    | "city"
    | "state"
    | "fees"
    | "rating"
    | "avgPackage"
    | "type"
    | "image"
    | "established"
  >
): CollegeCard {
  return {
    id: college.id,
    name: college.name,
    city: college.city,
    state: college.state,
    fees: college.fees,
    rating: college.rating,
    avgPackage: college.avgPackage,
    type: college.type,
    image: college.image,
    established: college.established,
  };
}

/** Prisma select shape for list/card views. */
export const collegeCardSelect = {
  id: true,
  name: true,
  city: true,
  state: true,
  fees: true,
  rating: true,
  avgPackage: true,
  type: true,
  image: true,
  established: true,
} satisfies Prisma.CollegeSelect;

/**
 * Maps API sort option to Prisma orderBy clause.
 */
export function getCollegeOrderBy(
  sort: SortOption
): Prisma.CollegeOrderByWithRelationInput {
  switch (sort) {
    case "fees_asc":
      return { fees: "asc" };
    case "fees_desc":
      return { fees: "desc" };
    case "package":
      return { avgPackage: "desc" };
    case "rating":
    default:
      return { rating: "desc" };
  }
}
