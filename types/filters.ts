export type SortOption = "rating" | "fees_asc" | "fees_desc" | "package";

export interface CollegeFilters {
  search: string;
  city: string;
  minFees: number;
  maxFees: number;
  minRating: number;
  type: string;
  page: number;
  limit: number;
  sort: SortOption;
}

export const DEFAULT_FILTERS: CollegeFilters = {
  search: "",
  city: "",
  minFees: 0,
  maxFees: 2500000,
  minRating: 0,
  type: "",
  page: 1,
  limit: 12,
  sort: "rating",
};

export const CITY_OPTIONS: string[] = [
  "Ahmedabad",
  "Bangalore",
  "Bhubaneswar",
  "Chennai",
  "Dehradun",
  "Delhi",
  "Gurgaon",
  "Jamshedpur",
  "Kanpur",
  "Kharagpur",
  "Kozhikode",
  "Manipal",
  "Mumbai",
  "Noida",
  "Patiala",
  "Phagwara",
  "Pilani",
  "Pune",
  "Rajpura",
  "Surathkal",
  "Tiruchirappalli",
  "Vellore",
  "Warangal",
];

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Relevance", value: "rating" },
  { label: "Fees: Low to High", value: "fees_asc" },
  { label: "Fees: High to Low", value: "fees_desc" },
  { label: "Highest Package", value: "package" },
];
