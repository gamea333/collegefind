"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { formatNumber } from "@/lib/utils";
import { CITY_OPTIONS } from "@/types/filters";

interface CollegeFiltersProps {
  onClose?: () => void;
}

const RATING_OPTIONS: { label: string; value: number }[] = [
  { label: "All", value: 0 },
  { label: "3+", value: 3 },
  { label: "3.5+", value: 3.5 },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
];

const TYPE_OPTIONS = ["Public/Govt", "Private", "Deemed"] as const;

export function CollegeFilters({ onClose }: CollegeFiltersProps) {
  const { filters, setFilter, resetFilters, isFiltering } = useFilters();
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  const handleTypeChange = (type: string, checked: boolean) => {
    setFilter("type", checked ? type : "");
  };

  return (
    <aside className="flex h-full flex-col gap-6">
      {onClose && (
        <div className="flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div>
        <label
          htmlFor="college-search"
          className="text-sm font-medium text-gray-700"
        >
          Search Colleges
        </label>
        <div className="relative mt-2">
          <input
            id="college-search"
            type="search"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              setFilter("search", event.target.value);
            }}
            placeholder="Search by name..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {filters.search && (
            <button
              type="button"
              onClick={() => setFilter("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 transition hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="college-city"
          className="text-sm font-medium text-gray-700"
        >
          City
        </label>
        <select
          id="college-city"
          value={filters.city || "all"}
          onChange={(event) =>
            setFilter("city", event.target.value === "all" ? "" : event.target.value)
          }
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
        >
          <option value="all">All Cities</option>
          {CITY_OPTIONS.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="max-fees"
          className="text-sm font-medium text-gray-700"
        >
          Annual Fees (₹):{" "}
          <span className="font-normal text-gray-500">
            ₹0 - ₹{formatNumber(filters.maxFees)}
          </span>
        </label>
        <input
          id="max-fees"
          type="range"
          min={0}
          max={2500000}
          step={50000}
          value={filters.maxFees}
          onChange={(event) =>
            setFilter("maxFees", Number(event.target.value))
          }
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-brand-600"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700">Minimum Rating</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {RATING_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setFilter("minRating", option.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                filters.minRating === option.value
                  ? "bg-brand-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700">College Type</p>
        <div className="mt-2 space-y-2">
          {TYPE_OPTIONS.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={filters.type === type}
                onChange={(event) => handleTypeChange(type, event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {isFiltering && (
        <button
          type="button"
          onClick={() => {
            resetFilters();
            onClose?.();
          }}
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600"
        >
          Clear All Filters
        </button>
      )}
    </aside>
  );
}
