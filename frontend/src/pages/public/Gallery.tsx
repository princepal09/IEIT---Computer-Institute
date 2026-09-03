import { useEffect, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import imageOne from "@/assets/gallery/one.jpeg";
import imageTwo from "@/assets/gallery/two.jpeg";
import imageThree from "@/assets/gallery/three.jpeg";
import imageFour from "@/assets/gallery/four.jpeg";
import imageFive from "@/assets/gallery/five.jpeg";
import imageSix from "@/assets/gallery/six.jpeg";
import GalleryCard, {
  GalleryItem,
} from "@/components/public/gallery/GalleryCard";

const mockGalleryItems: GalleryItem[] = [
  { id: 1, image: imageOne, alt: "Learning at IEIT" },
  { id: 2, image: imageTwo, alt: "Our Campus" },
  { id: 3, image: imageThree, alt: "Student Activities" },
  { id: 4, image: imageFour, alt: "Student Achievements" },
  { id: 5, image: imageFive, alt: "Training Sessions" },
  { id: 6, image: imageSix, alt: "Community & Events" },
];

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f7f9f8] py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
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

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 p-4  gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {mockGalleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

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
