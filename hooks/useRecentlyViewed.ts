"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CollegeCard } from "@/types/college";

const MAX_RECENT = 4;

interface RecentlyViewedState {
  recentList: CollegeCard[];
  addToRecent: (college: CollegeCard) => void;
  clearRecent: () => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      recentList: [],
      addToRecent: (college: CollegeCard): void => {
        const { recentList } = get();
        const withoutCurrent = recentList.filter(
          (item) => item.id !== college.id
        );
        const next = [college, ...withoutCurrent].slice(0, MAX_RECENT);
        set({ recentList: next });
      },
      clearRecent: (): void => {
        set({ recentList: [] });
      },
    }),
    {
      name: "collegefind-recent",
    }
  )
);
