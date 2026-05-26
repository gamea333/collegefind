"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Check, MapPin, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { useCompare } from "@/hooks/useCompare";
import { formatFees } from "@/lib/utils";
import type { CollegeCard as CollegeCardType } from "@/types/college";

interface CollegeCardProps {
  college: CollegeCardType;
  isSaved: boolean;
  onSave: (id: string) => void;
  isLoggedIn: boolean;
}

function getCollegeInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export function CollegeCard({
  college,
  isSaved,
  onSave,
  isLoggedIn,
}: CollegeCardProps) {
  const { compareList, addToCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(college.id);
  const compareFull = compareList.length >= 3 && !inCompare;
  const reviewCount = Math.round(college.rating * 420 + college.established);

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isLoggedIn) {
      window.alert("Please login to save colleges");
      return;
    }
    onSave(college.id);
  };

  const handleCompare = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!compareFull && !inCompare) {
      addToCompare(college);
    }
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow duration-200 hover:shadow-lg">
      <Link href={`/colleges/${college.id}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-gray-100">
          {college.image ? (
            <Image
              src={college.image}
              alt={college.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <span className="text-4xl font-bold text-gray-500">
                {getCollegeInitial(college.name)}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 font-semibold text-gray-900">
            {college.name}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {college.city}, {college.state}
          </p>
          <p className="mt-2 font-medium text-gray-800">
            {formatFees(college.fees)}
          </p>
          <div className="mt-2">
            <StarRating
              rating={college.rating}
              showNumber
              reviewCount={reviewCount}
              size="sm"
            />
          </div>
          <div className="mt-3">
            <Badge type={college.type} />
          </div>
        </div>
      </Link>

      <div className="flex border-t border-gray-100">
        <button
          type="button"
          onClick={handleSave}
          className="flex w-1/2 items-center justify-center gap-2 border-r border-gray-100 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-inset"
        >
          <Bookmark
            className={`h-4 w-4 ${
              isSaved ? "fill-brand-600 text-brand-600" : "text-gray-500"
            }`}
          />
          {isSaved ? "Saved" : "Save"}
        </button>
        <button
          type="button"
          onClick={handleCompare}
          disabled={compareFull}
          className={`flex w-1/2 items-center justify-center gap-2 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-inset ${
            compareFull
              ? "cursor-not-allowed text-gray-400"
              : inCompare
                ? "text-brand-600 hover:bg-blue-50"
                : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {inCompare ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Compare
            </>
          )}
        </button>
      </div>
    </article>
  );
}
