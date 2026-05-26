import { Skeleton } from "@/components/ui/Skeleton";

export function CollegeCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <Skeleton className="aspect-video w-full rounded-t-xl rounded-b-none" />
      <div className="space-y-3 p-4">
        <Skeleton lines={2} />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <div className="flex border-t border-gray-100">
        <Skeleton className="h-12 w-1/2 rounded-none" />
        <Skeleton className="h-12 w-1/2 rounded-none" />
      </div>
    </article>
  );
}
