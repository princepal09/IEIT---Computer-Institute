import { Skeleton } from "@/components/ui/skeleton";

const BranchesSkeleton = () => {
  return (
    <div className="space-y-1 px-1.5 py-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-lg px-2.5 py-2.5"
        >
          <Skeleton className="size-8 shrink-0 rounded-lg" />

          <div className="flex flex-1 flex-col gap-2 pt-0.5">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2.5 w-20" />
          </div>

          <Skeleton className="mt-1 size-3 rounded" />
        </div>
      ))}
    </div>
  );
};

export default BranchesSkeleton;
