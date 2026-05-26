"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, Scale, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CompareTable } from "@/components/compare/CompareTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCompare } from "@/hooks/useCompare";
import { toCollegeCard } from "@/lib/college-card";
import type { College } from "@/types/college";

interface CompareApiResponse {
  colleges: College[];
}

async function fetchCompareColleges(ids: string[]): Promise<College[]> {
  const response = await fetch(
    `/api/colleges/compare?ids=${ids.join(",")}`
  );

  if (!response.ok) {
    const body = (await response.json()) as { error?: string };
    throw new Error(body.error ?? "Failed to load comparison");
  }

  const data = (await response.json()) as CompareApiResponse;
  return data.colleges;
}

function ShareButton({ ids }: { ids: string[] }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = new URL("/compare", window.location.origin);
      url.searchParams.set("ids", ids.join(","));
      await navigator.clipboard.writeText(url.toString());

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleShare()}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-green-600">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          <span className="font-medium">Share Comparison</span>
        </>
      )}
    </button>
  );
}

export default function ComparePage() {
  const { compareList, addToCompare } = useCompare();
  const ids = compareList.map((college) => college.id);
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids");

  const hydratedIds = useMemo(() => {
    if (!idsParam) return [];
    return idsParam
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0)
      .slice(0, 3);
  }, [idsParam]);

  useEffect(() => {
    const hydrate = async () => {
      if (!idsParam) return;
      if (compareList.length !== 0) return;
      if (hydratedIds.length === 0) return;
      try {
        const colleges = await fetchCompareColleges(hydratedIds);
        colleges.forEach((college) => addToCompare(toCollegeCard(college)));
      } catch {
        // Ignore hydration errors (e.g., invalid ids) to avoid breaking page render.
      }
    };

    void hydrate();
  }, [addToCompare, compareList.length, hydratedIds, idsParam]);

  const { data: colleges = [], isLoading, isError } = useQuery({
    queryKey: ["compare", ids],
    queryFn: () => fetchCompareColleges(ids),
    enabled: ids.length > 0,
  });

  if (compareList.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 pb-24 text-center">
        <Scale className="h-16 w-16 text-gray-300" />
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          No colleges to compare
        </h1>
        <p className="mt-2 text-gray-500">
          Add colleges from the listing page to compare them side by side.
        </p>
        <Link
          href="/colleges"
          className="mt-8 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
        >
          Browse Colleges
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-24">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compare Colleges</h1>
          <p className="mt-2 text-gray-600">
            Side-by-side comparison of selected institutions
          </p>
        </div>

        {compareList.length >= 2 && <ShareButton ids={ids} />}
      </header>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="mt-4 h-6 w-3/4" />
              <Skeleton lines={3} className="mt-4" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          Failed to load college details. Please try again.
        </div>
      )}

      {!isLoading && !isError && colleges.length > 0 && (
        <CompareTable colleges={colleges} />
      )}
    </div>
  );
}
