"use client";

import { Check, Plus } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import type { CollegeCard } from "@/types/college";

interface AddToCompareButtonProps {
  college: CollegeCard;
}

export function AddToCompareButton({ college }: AddToCompareButtonProps) {
  const { compareList, addToCompare, removeFromCompare, isInCompare } =
    useCompare();
  const inCompare = isInCompare(college.id);
  const compareFull = compareList.length >= 3 && !inCompare;

  const handleClick = () => {
    if (inCompare) {
      removeFromCompare(college.id);
      return;
    }
    addToCompare(college);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={compareFull}
      className={`flex w-full items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 ${
        inCompare
          ? "border-brand-600 bg-blue-50 text-brand-600"
          : compareFull
            ? "cursor-not-allowed border-gray-200 text-gray-400"
            : "border-gray-300 text-gray-800 hover:bg-gray-50"
      }`}
    >
      {inCompare ? (
        <>
          <Check className="h-4 w-4" />
          Added to Compare
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          Add to Compare
        </>
      )}
    </button>
  );
}
