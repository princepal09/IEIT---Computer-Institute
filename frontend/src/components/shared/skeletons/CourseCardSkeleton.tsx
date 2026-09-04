import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardContent className="p-0">
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-start justify-between">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="mt-5 h-6 w-3/4" />

          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>

        <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
          <div className="p-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-4 w-24" />
          </div>

          <div className="p-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-4 w-24" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5">
          <div>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="mt-2 h-5 w-20" />
          </div>

          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCardSkeleton;