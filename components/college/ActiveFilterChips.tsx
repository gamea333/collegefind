"use client";

import { X } from "lucide-react";
import { DEFAULT_FILTERS, type CollegeFilters } from "@/types/filters";
import { useFilters } from "@/hooks/useFilters";

function formatFeesInLakhs(fees: number): string {
  const lakhs = fees / 100000;
  return lakhs.toFixed(1);
}

export function ActiveFilterChips() {
  const { filters, setFilter, resetFilters, activeFilterCount } = useFilters();

  if (activeFilterCount === 0) {
    return null;
  }

  const chips: Array<{
    id: keyof CollegeFilters;
    label: string;
    onRemove: () => void;
  }> = [];

  if (filters.search) {
    chips.push({
      id: "search",
      label: `Search: "${filters.search}"`,
      onRemove: () => setFilter("search", DEFAULT_FILTERS.search),
    });
  }

  if (filters.city) {
    chips.push({
      id: "city",
      label: `City: ${filters.city}`,
      onRemove: () => setFilter("city", DEFAULT_FILTERS.city),
    });
  }

  if (filters.type) {
    chips.push({
      id: "type",
      label: `Type: ${filters.type}`,
      onRemove: () => setFilter("type", DEFAULT_FILTERS.type),
    });
  }

  if (filters.minRating > 0) {
    chips.push({
      id: "minRating",
      label: `Rating: ${filters.minRating}+`,
      onRemove: () => setFilter("minRating", DEFAULT_FILTERS.minRating),
    });
  }

  if (filters.maxFees < DEFAULT_FILTERS.maxFees) {
    chips.push({
      id: "maxFees",
      label: `Fees: Up to ₹${formatFeesInLakhs(filters.maxFees)}L`,
      onRemove: () => setFilter("maxFees", DEFAULT_FILTERS.maxFees),
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-sm font-medium text-gray-500">
        Active filters:
      </span>

      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
        >
          <span>{chip.label}</span>
          <X className="h-3 w-3" />
        </button>
      ))}

      <button
        type="button"
        onClick={resetFilters}
        className="ml-1 text-sm font-medium text-red-600 underline transition hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded"
      >
        Clear all
      </button>
    </div>
  );
}

