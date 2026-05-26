"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";

export function CompareBar() {
  const router = useRouter();
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const isVisible = compareList.length > 0;
  const canCompare = compareList.length >= 2;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-gray-200 bg-white shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="shrink-0 text-sm text-gray-500">
            {compareList.length} college{compareList.length !== 1 ? "s" : ""}{" "}
            selected
          </span>
          <div className="flex min-w-0 gap-2 overflow-x-auto">
            {compareList.map((college) => (
              <span
                key={college.id}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
              >
                <span className="max-w-[120px] truncate">{college.name}</span>
                <button
                  type="button"
                  onClick={() => removeFromCompare(college.id)}
                  className="rounded-full p-0.5 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  aria-label={`Remove ${college.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={clearCompare}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
          >
            Clear All
          </button>
          <span
            className="relative inline-flex"
            title={canCompare ? undefined : "Select at least 2 colleges"}
          >
            <button
              type="button"
              disabled={!canCompare}
              onClick={() => router.push("/compare")}
              className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Compare Now
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
