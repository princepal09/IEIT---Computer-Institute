import { CACHE_KEYS } from '../../constants/cache-key.js';
import ApiError from '../../utils/AppError.js';
import { deleteCache, getCache, setCache } from '../../utils/cache.js';

import { deleteFromCloudinary, uploadToCloudinary } from '../../utils/cloudinary.helper.js';

import { IGalleryRepository } from './gallery.interface.js';

// import { updateGallerySchemaDTO } from './gallery.schema.js';

export class GalleryService {
  constructor(private readonly repo: IGalleryRepository) {}

  // ==========================================
  // CREATE / UPLOAD MULTIPLE IMAGES
  // ==========================================

  async createGallery(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new ApiError(400, 'At least one image is required');
    }

    const uploadedImages: {
      imageUrl: string;
      imagePublicId: string;
    }[] = [];

    try {
      // --------------------------------------
      // Upload images to Cloudinary
      // --------------------------------------

      for (const file of files) {
        const uploadedImage = await uploadToCloudinary(file, 'ieit/gallery');

        uploadedImages.push({
          imageUrl: uploadedImage.secure_url,
          imagePublicId: uploadedImage.public_id,
        });
      }

      // --------------------------------------
      // Automatically assign displayOrder
      // --------------------------------------

      const galleryData = uploadedImages.map((image, index) => ({
        imageUrl: image.imageUrl,
        imagePublicId: image.imagePublicId,

        // Automatically:
        // 0, 1, 2, 3, 4...
        displayOrder: index,
      }));

      // --------------------------------------
      // Save in database
      // --------------------------------------

      await this.repo.createManyGallery(galleryData);
      await deleteCache(CACHE_KEYS.GALLERY);
    } catch (error) {
      for (const image of uploadedImages) {
        try {
          await deleteFromCloudinary(image.imagePublicId);
        } catch (cleanupError) {
          console.error('Failed to cleanup gallery image:', cleanupError);
        }
      }

      throw error;
    }
  }

  async getAllGallery() {
    const cachedGallery = await getCache(CACHE_KEYS.GALLERY);

    if (cachedGallery) {
      return cachedGallery;
    }
    const gallery = await this.repo.findAllGallery();

    const formattedGallery = gallery.map((image) => this.formatGallery(image));

    await setCache(CACHE_KEYS.GALLERY, formattedGallery, 10 * 60);
    return formattedGallery;
  }

  async getGalleryById(id: string) {
    const gallery = await this.repo.findGalleryById(id);

    if (!gallery) {
      throw new ApiError(404, 'Gallery image not found');
    }

    return this.formatGallery(gallery);
  }

  //UPDATE GALLERY
  //   async updateGallery(
  //     id: string,
  //     data: updateGallerySchemaDTO,
  //   ) {

  //     const gallery =
  //       await this.repo.findGalleryById(id);

  //     if (!gallery) {
  //       throw new ApiError(
  //         404,
  //         'Gallery image not found',
  //       );
  //     }

  //     const updatedGallery =
  //       await this.repo.updateGallery(
  //         id,
  //         data,
  //       );

  //     return this.formatGallery(
  //       updatedGallery,
  //     );
  //   }

  // ==========================================
  // DELETE GALLERY
  // ==========================================

  async deleteGallery(id: string) {
    const gallery = await this.repo.findGalleryById(id);

    if (!gallery) {
      throw new ApiError(404, 'Gallery image not found');
    }

    // Delete database record
    const deletedGallery = await this.repo.deleteGallery(id);

    // Delete image from Cloudinary
    if (gallery.imagePublicId) {
      try {
        await deleteFromCloudinary(gallery.imagePublicId);
      } catch (error) {
        console.error('Failed to delete gallery image from Cloudinary:', error);
      }
    }

    await deleteCache(CACHE_KEYS.GALLERY);

    return deletedGallery;
  }

  //FORMAT RESPONSE

  private formatGallery(gallery: any) {
    return {
      id: gallery.id,
      imageUrl: gallery.imageUrl,
      displayOrder: gallery.displayOrder,
      isPublished: gallery.isPublished,
      createdAt: gallery.createdAt,
      updatedAt: gallery.updatedAt,
    };
  }
}
