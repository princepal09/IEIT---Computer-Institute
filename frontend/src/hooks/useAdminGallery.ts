import {
  createAdminGallery,
  deleteAdminGallery,
  getAdminGallery,
} from "@/api/gallery.api";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const adminGalleryKeys = {
  all: ["admin-gallery"] as const,
};

export const useAdminGallery = () => {
  return useQuery({
    queryKey: adminGalleryKeys.all,
    queryFn: getAdminGallery,
  });
};

export const useCreateAdminGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (files: File[]) => createAdminGallery(files),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminGalleryKeys.all,
      });
    },
  });
};

export const useDeleteAdminGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (galleryId: string) =>
      deleteAdminGallery(galleryId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminGalleryKeys.all,
      });
    },
  });
};