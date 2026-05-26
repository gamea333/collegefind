"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import type { CollegeCard } from "@/types/college";

interface TrackViewProps {
  college: CollegeCard;
}

export function TrackView({ college }: TrackViewProps) {
  const addToRecent = useRecentlyViewed((state) => state.addToRecent);

  useEffect(() => {
    addToRecent(college);
  }, [addToRecent, college]);

  return null;
}
