import api from "@/lib/axios";

import type {
  AdminGallery,
  GalleriesResponse,
  GalleryResponse,
} from "@/types/gallery";

export const getAdminGallery = async (): Promise<AdminGallery[]> => {
  const response = await api.get<GalleriesResponse>("/gallery/all");

  return response.data.data;
};

export const createAdminGallery = async (files: File[]): Promise<void> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  await api.post("/gallery/create", formData);
};

export const deleteAdminGallery = async (galleryId: string): Promise<void> => {
  await api.delete<GalleryResponse>(`/gallery/delete/${galleryId}`);
};

export const getGallery = async (): Promise<AdminGallery[]> => {
  const response = await api.get<GalleriesResponse>("/gallery/all");

  return response.data.data;
};
