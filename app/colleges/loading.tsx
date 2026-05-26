import { Skeleton } from "@/components/ui/Skeleton";

export default function CollegesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-24">
      <div className="flex gap-6">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <Skeleton className="h-4 w-28" lines={5} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <article
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white animate-pulse"
              >
                <div className="aspect-video bg-gray-200" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-4 w-4/5 rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                </div>
                <div className="flex border-t border-gray-100">
                  <Skeleton className="h-12 w-1/2 rounded-none" />
                  <Skeleton className="h-12 w-1/2 rounded-none" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

