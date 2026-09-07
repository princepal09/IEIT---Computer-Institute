import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import GalleryCard from "@/components/public/gallery/GalleryCard";
import { useGallery } from "@/hooks/useGallery";
import PublicGallerySkeleton from "@/components/shared/skeletons/PublicGallerySkeleton";

const Gallery = () => {
  const {
    data: gallery = [],
    isLoading,
    isError,
  } = useGallery();

  return (
    <section className="relative overflow-hidden bg-[#f7f9f8] py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-7 bg-ieit-blue/60" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ieit-blue">
                Visual Archive
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-[-0.045em] text-slate-900 sm:text-4xl lg:text-5xl">
              Life at IEIT
              <span className="block text-ieit-blue">
                beyond the classroom.
              </span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
              A glimpse into our campuses, training sessions, student
              activities, events, and achievements across IEIT.
            </p>
          </div>

          <Link to="/gallery">
            <Button
              variant="outline"
              size="sm"
              className="group w-fit rounded-lg border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm hover:border-ieit-blue hover:text-ieit-blue"
            >
              View Gallery

              <ArrowRightIcon className="ml-1.5 size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Gallery */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {/* Loading */}
          {isLoading && <PublicGallerySkeleton />}

          {/* Error */}
          {!isLoading && isError && (
            <div className="col-span-full flex min-h-60 items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-slate-900">
                  Unable to load gallery
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Please try again later.
                </p>
              </div>
            </div>
          )}

          {/* Gallery Images */}
          {!isLoading && !isError && gallery.length > 0 &&
            gallery.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
              />
            ))}

          {/* Empty State */}
          {!isLoading && !isError && gallery.length === 0 && (
            <div className="col-span-full flex min-h-60 items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-slate-900">
                  No gallery images yet
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Gallery images will appear here once they are uploaded.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Almora · Bageshwar · Delhi
          </p>

          <p className="mt-1 text-xs text-slate-400">
            One institute. Three campuses. A community of learners.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;