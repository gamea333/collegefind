import { Skeleton } from "@/components/ui/Skeleton";

export default function PredictorLoading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Skeleton className="mx-auto h-16 w-16 rounded-2xl" />
          <Skeleton className="mt-6 h-8 w-64 rounded" />
          <Skeleton className="mt-3 h-4 w-96 max-w-full rounded" />
        </div>

        <div className="mt-8 mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

