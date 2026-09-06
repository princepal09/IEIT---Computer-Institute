import { Skeleton } from "@/components/ui/skeleton";

const EnquirySkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-2 h-3 w-48" />
      </div>

      <div className="divide-y divide-slate-100">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 px-5 py-5 sm:grid-cols-[140px_1fr]"
          >
            <Skeleton className="h-3 w-20" />

            <div>
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="mt-2 h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnquirySkeleton;