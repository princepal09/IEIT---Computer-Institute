import { Skeleton } from "@/components/ui/skeleton";

const PublicGallerySkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
        </div>
      ))}
    </>
  );
};

export default PublicGallerySkeleton;