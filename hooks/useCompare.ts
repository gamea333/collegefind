"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CollegeCard } from "@/types/college";

interface CompareState {
  compareList: CollegeCard[];
  addToCompare: (college: CollegeCard) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      compareList: [],
      addToCompare: (college: CollegeCard): boolean => {
        const { compareList } = get();
        if (compareList.length >= 3) {
          return false;
        }
        if (compareList.some((item) => item.id === college.id)) {
          return false;
        }
        set({ compareList: [...compareList, college] });
        return true;
      },
      removeFromCompare: (id: string): void => {
        set({
          compareList: get().compareList.filter((college) => college.id !== id),
        });
      },
      clearCompare: (): void => {
        set({ compareList: [] });
      },
      isInCompare: (id: string): boolean => {
        return get().compareList.some((college) => college.id === id);
      },
    }),
    {
      name: "collegefind-compare",
    }
  )
);
