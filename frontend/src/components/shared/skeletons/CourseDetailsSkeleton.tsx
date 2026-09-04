import { PageContainer } from "@/components/shared/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

const CourseDetailsSkeleton = () => {
  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-950 py-16 sm:py-20">
        <PageContainer>
          <Skeleton className="h-4 w-28 bg-slate-800" />

          <Skeleton className="mt-8 h-5 w-24 bg-slate-800" />

          <Skeleton className="mt-5 h-12 w-full max-w-2xl bg-slate-800" />

          <Skeleton className="mt-4 h-5 w-full max-w-xl bg-slate-800" />

          <Skeleton className="mt-2 h-5 w-4/5 max-w-xl bg-slate-800" />

          <Skeleton className="mt-8 h-11 w-32 rounded-lg bg-slate-800" />
        </PageContainer>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-8">
              <SkeletonSection />
              <SkeletonSection />
              <SkeletonSection />
            </div>

            <div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="mt-3 h-6 w-48" />

                <div className="mt-6 space-y-5">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <Skeleton className="mt-6 h-11 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </main>
  );
};

const SkeletonSection = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-3 h-7 w-64" />

      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;
