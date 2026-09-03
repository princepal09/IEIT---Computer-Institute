import { cn } from "@/lib/utils";

export type GalleryItem = {
  id: number;
  image: string;
  alt?: string;
  className?: string;
};

type GalleryCardProps = {
  item: GalleryItem;
};

const GalleryCard = ({ item }: GalleryCardProps) => {
  return (
    <div
      className={cn(
        "group relative aspect-square overflow-hidden rounded-2xl bg-slate-200",
        item.className
      )}
    >
      <img
        src={item.image}
        alt={item.alt || "IEIT Institute"}
        loading="lazy"
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-500
          ease-out
          group-hover:scale-[1.04]
        "
      />

      {/* Very subtle overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-slate-950/20
          via-transparent
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />
    </div>
  );
};

export default GalleryCard;