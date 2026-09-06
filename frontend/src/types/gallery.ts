export interface AdminGallery {
  id: string;
  imageUrl: string;
  imagePublicId: string;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryResponse {
  success: boolean;
  message: string;
  data: AdminGallery;
}

export interface GalleriesResponse {
  success: boolean;
  message: string;
  data: AdminGallery[];
}