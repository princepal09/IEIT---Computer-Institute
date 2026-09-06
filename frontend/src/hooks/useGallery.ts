import { getGallery } from "@/api/gallery.api";

import { useQuery } from "@tanstack/react-query";

export const galleryKeys = {
  all: ["gallery"] as const,
};

export const useGallery = () => {
  return useQuery({
    queryKey: galleryKeys.all,
    queryFn: getGallery,
  });
};
