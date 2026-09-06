import { Skeleton } from "@/components/ui/skeleton";

const NoticeSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/50 p-5">
        <Skeleton className="h-5 w-3/4" />

        <Skeleton className="mt-3 h-3 w-32" />
      </div>

      <div className="space-y-4 p-5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />

        <div className="flex gap-3 pt-2">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default NoticeSkeleton;