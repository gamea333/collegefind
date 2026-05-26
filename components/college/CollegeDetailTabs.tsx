"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { formatPackage } from "@/lib/utils";
import type { College } from "@/types/college";

interface CollegeDetailTabsProps {
  college: College;
}

type TabId = "overview" | "courses" | "placements";

export function CollegeDetailTabs({ college }: CollegeDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Courses" },
    { id: "placements", label: "Placements" },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white">
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-inset ${
              activeTab === tab.id
                ? "border-b-2 border-brand-600 text-brand-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {college.overview.split(". ").map((sentence, index, arr) => {
              const text = sentence.trim();
              if (!text) return null;
              const punctuated =
                index < arr.length - 1 && !text.endsWith(".")
                  ? `${text}.`
                  : text;
              return <p key={index}>{punctuated}</p>;
            })}
          </div>
        )}

        {activeTab === "courses" && (
          <div className="flex flex-wrap gap-2">
            {college.courses.map((course) => (
              <span
                key={course}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
              >
                {course}
              </span>
            ))}
          </div>
        )}

        {activeTab === "placements" && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-4xl font-bold text-brand-600">
              {formatPackage(college.avgPackage)}
            </p>
            <p className="mt-2 text-gray-500">Average Package</p>
          </div>
        )}
      </div>
    </div>
  );
}
