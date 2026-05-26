import { create } from "zustand";
import { DEFAULT_FILTERS, type CollegeFilters } from "@/types/filters";

interface FilterState {
  filters: CollegeFilters;
  setFilters: (partial: Partial<CollegeFilters>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: { ...DEFAULT_FILTERS },
  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),
  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
}));
