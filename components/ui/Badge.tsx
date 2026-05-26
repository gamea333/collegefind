import { cn } from "@/lib/utils";

interface BadgeProps {
  type: string;
  className?: string;
}

function getBadgeStyles(type: string): string {
  switch (type) {
    case "Public/Govt":
      return "bg-blue-100 text-blue-700";
    case "Private":
      return "bg-orange-100 text-orange-700";
    case "Deemed":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function Badge({ type, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getBadgeStyles(type),
        className
      )}
    >
      {type}
    </span>
  );
}
