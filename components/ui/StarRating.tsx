import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  showNumber?: boolean;
  reviewCount?: number;
  size?: "sm" | "md";
}

export function StarRating({
  rating,
  showNumber = false,
  reviewCount,
  size = "sm",
}: StarRatingProps) {
  const clampedRating = Math.min(5, Math.max(0, rating));
  const fullStars = Math.floor(clampedRating);
  const partialFill = clampedRating - fullStars;
  const iconSize = size === "md" ? "h-5 w-5" : "h-4 w-4";
  const textSize = size === "md" ? "text-base" : "text-sm";

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < fullStars) {
            return (
              <Star
                key={index}
                className={cn(iconSize, "fill-yellow-400 text-yellow-400")}
              />
            );
          }

          if (index === fullStars && partialFill > 0) {
            return (
              <span key={index} className="relative inline-flex">
                <Star className={cn(iconSize, "text-gray-200")} />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${partialFill * 100}%` }}
                >
                  <Star
                    className={cn(iconSize, "fill-yellow-400 text-yellow-400")}
                  />
                </span>
              </span>
            );
          }

          return (
            <Star key={index} className={cn(iconSize, "text-gray-200")} />
          );
        })}
      </div>
      {showNumber && (
        <span className={cn("font-medium text-gray-800", textSize)}>
          {clampedRating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn("text-gray-500", textSize)}>
          ({reviewCount.toLocaleString("en-IN")} reviews)
        </span>
      )}
    </div>
  );
}
