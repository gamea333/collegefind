"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { useCompare } from "@/hooks/useCompare";
import { getBestIndex } from "@/lib/compare-utils";
import { formatFees, formatPackage } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { College } from "@/types/college";

interface CompareTableProps {
  colleges: College[];
}

interface AttributeRow {
  label: string;
  render: (college: College) => ReactNode;
  values?: (college: College) => number;
  direction?: "min" | "max";
}

export function CompareTable({ colleges }: CompareTableProps) {
  const router = useRouter();
  const { removeFromCompare } = useCompare();

  const feeValues = colleges.map((c) => c.fees);
  const ratingValues = colleges.map((c) => c.rating);
  const packageValues = colleges.map((c) => c.avgPackage);

  const bestFeesIndex = getBestIndex(feeValues, "min");
  const bestRatingIndex = getBestIndex(ratingValues, "max");
  const bestPackageIndex = getBestIndex(packageValues, "max");

  const rows: AttributeRow[] = [
    {
      label: "Annual Fees",
      render: (college) => formatFees(college.fees),
      values: (college) => college.fees,
      direction: "min",
    },
    {
      label: "Rating",
      render: (college) => (
        <StarRating rating={college.rating} showNumber size="sm" />
      ),
      values: (college) => college.rating,
      direction: "max",
    },
    {
      label: "Avg Package",
      render: (college) => formatPackage(college.avgPackage),
      values: (college) => college.avgPackage,
      direction: "max",
    },
    {
      label: "Location",
      render: (college) => `${college.city}, ${college.state}`,
    },
    {
      label: "Type",
      render: (college) => <Badge type={college.type} />,
    },
    {
      label: "Established",
      render: (college) => String(college.established),
    },
    {
      label: "Courses Offered",
      render: (college) => {
        const count = college.courses.length;
        return count >= 10 ? `${count}+` : String(count);
      },
    },
  ];

  const getHighlightIndex = (row: AttributeRow): number | null => {
    if (!row.values || !row.direction) return null;
    const values = colleges.map(row.values);
    return getBestIndex(values, row.direction);
  };

  const emptySlots = 3 - colleges.length;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-40 border-b border-gray-200 bg-gray-50 p-4 text-left text-sm font-medium text-gray-500">
              Attribute
            </th>
            {colleges.map((college) => (
              <th
                key={college.id}
                className="min-w-[200px] border-b border-l border-gray-200 p-4 align-top"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => removeFromCompare(college.id)}
                    className="absolute right-0 top-0 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    aria-label="Remove from compare"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                    {college.image ? (
                      <Image
                        src={college.image}
                        alt={college.name}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-2xl font-bold text-gray-500">
                        {college.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="pr-6 text-left font-bold text-gray-900">
                    {college.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {college.city}, {college.state}
                  </p>
                </div>
              </th>
            ))}
            {Array.from({ length: emptySlots }).map((_, index) => (
              <th
                key={`empty-${index}`}
                className="min-w-[200px] border-b border-l border-gray-200 p-4 align-top"
              >
                <button
                  type="button"
                  onClick={() => router.push("/colleges")}
                  className="flex h-full min-h-[220px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-brand-600 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600"
                >
                  <Plus className="h-8 w-8" />
                  <span className="mt-2 text-sm font-medium">Add College</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const highlightIndex =
              row.label === "Annual Fees"
                ? bestFeesIndex
                : row.label === "Rating"
                  ? bestRatingIndex
                  : row.label === "Avg Package"
                    ? bestPackageIndex
                    : getHighlightIndex(row);

            return (
              <tr
                key={row.label}
                className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border-b border-gray-200 p-4 text-sm font-medium text-gray-700">
                  {row.label}
                </td>
                {colleges.map((college, colIndex) => (
                  <td
                    key={college.id}
                    className={cn(
                      "border-b border-l border-gray-200 p-4 text-sm text-gray-800",
                      highlightIndex === colIndex &&
                        "bg-green-50 font-semibold text-green-700"
                    )}
                  >
                    {row.render(college)}
                  </td>
                ))}
                {Array.from({ length: emptySlots }).map((_, index) => (
                  <td
                    key={`empty-cell-${index}`}
                    className="border-b border-l border-gray-200 p-4"
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
