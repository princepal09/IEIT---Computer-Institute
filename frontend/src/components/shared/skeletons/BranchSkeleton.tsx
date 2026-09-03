import { Skeleton } from "@/components/ui/skeleton";

const BranchSkeleton = () => {
  return (
    <main className="bg-[#f7f9f8]">
      {/* Hero */}
      <section className="bg-slate-200">
        <div className="min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]" />
      </section>

      {/* Info */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Skeleton className="h-3 w-28" />

          <Skeleton className="mt-3 h-10 w-72" />

          <Skeleton className="mt-4 h-5 w-full max-w-xl" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <Skeleton className="size-10 rounded-xl" />

                <Skeleton className="mt-5 h-3 w-20" />

                <Skeleton className="mt-2 h-5 w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Skeleton className="h-3 w-24 bg-white/10" />

              <Skeleton className="mt-4 h-10 w-72 bg-white/10" />

              <Skeleton className="mt-4 h-16 w-full max-w-lg bg-white/10" />
            </div>

            <Skeleton className="h-64 rounded-2xl bg-white/10" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default BranchSkeleton;