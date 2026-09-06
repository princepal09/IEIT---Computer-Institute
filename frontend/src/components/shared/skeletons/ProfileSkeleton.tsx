import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card className="rounded-2xl border-slate-200">
        <CardContent className="p-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-2 h-6 w-44" />

          <div className="mt-6 flex items-center gap-4">
            <Skeleton className="size-24 rounded-2xl" />

            <div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-2 h-3 w-40" />
            </div>
          </div>

          <Skeleton className="mt-8 h-10 w-full rounded-xl" />
          <Skeleton className="mt-5 h-10 w-full rounded-xl" />
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-slate-200">
        <CardContent className="p-6">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="mt-4 h-4 w-20" />
          <Skeleton className="mt-2 h-6 w-40" />

          <Skeleton className="mt-8 h-10 w-full rounded-xl" />
          <Skeleton className="mt-5 h-10 w-full rounded-xl" />
          <Skeleton className="mt-5 h-10 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSkeleton;