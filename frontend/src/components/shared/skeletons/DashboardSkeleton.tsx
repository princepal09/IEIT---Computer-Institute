import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="rounded-2xl border-slate-200"
          >
            <CardContent className="p-5">
              <Skeleton className="size-11 rounded-xl" />

              <Skeleton className="mt-5 h-8 w-16" />

              <Skeleton className="mt-2 h-4 w-28" />

              <Skeleton className="mt-2 h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent */}
      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, cardIndex) => (
          <Card
            key={cardIndex}
            className="rounded-2xl border-slate-200"
          >
            <CardContent className="p-5">
              <Skeleton className="h-5 w-40" />

              <div className="mt-6 space-y-5">
                {Array.from({ length: 5 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <Skeleton className="size-10 rounded-xl" />

                      <div className="flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-2 h-3 w-48" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;