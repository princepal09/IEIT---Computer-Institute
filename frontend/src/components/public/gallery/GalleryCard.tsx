import type { AdminGallery } from "@/types/gallery";

interface GalleryCardProps {
  item: AdminGallery;
}

const GalleryCard = ({ item }: GalleryCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.imageUrl}
          alt="IEIT gallery"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default GalleryCard;