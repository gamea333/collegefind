import { Skeleton } from "@/components/ui/Skeleton";

export default function CompareLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-24">
      <div>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-3 h-4 w-96" />
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="space-y-3"
            >
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

