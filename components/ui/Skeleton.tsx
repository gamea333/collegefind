import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  lines?: number;
}

const LINE_WIDTHS = ["w-full", "w-3/4", "w-1/2"] as const;

export function Skeleton({ className, lines }: SkeletonProps) {
  if (lines && lines > 0) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-4 rounded bg-gray-200 animate-pulse",
              LINE_WIDTHS[index % LINE_WIDTHS.length]
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("rounded bg-gray-200 animate-pulse", className ?? "h-4 w-full")}
    />
  );
}
