import ApiError from '../../utils/AppError.js';

import { deleteFromCloudinary, uploadToCloudinary } from '../../utils/cloudinary.helper.js';

import { INoticeRepository } from './notice.interface.js';
import { INoticeResponse } from './notice.response.js';

import { createNoticeSchemaDTO, updateNoticeSchemaDTO } from './notice.schema.js';

export class NoticeService {
  constructor(private readonly repo: INoticeRepository) {}

  // CREATE NOTICE
  async createNotice(data: createNoticeSchemaDTO, file?: Express.Multer.File) {
    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    // Upload image
    if (file) {
      const uploadedImage = await uploadToCloudinary(file, 'ieit/notices');

      imageUrl = uploadedImage.secure_url;
      imagePublicId = uploadedImage.public_id;
    }

    /*
     * If admin wants to publish the notice but
     * does not provide publishedAt,
     * use current time.
     */
    let publishedAt = data.publishedAt;

    if (data.isPublished === true && !publishedAt) {
      publishedAt = new Date();
    }

    try {
      const notice = await this.repo.createNotice({
        ...data,
        publishedAt,
        imageUrl,
        imagePublicId,
      });

      return this.formatNotice(notice);
    } catch (error) {
      // DB failed after image upload
      if (imagePublicId) {
        try {
          await deleteFromCloudinary(imagePublicId);
        } catch (cleanupError) {
          console.error('Failed to cleanup uploaded notice image:', cleanupError);
        }
      }

      throw error;
    }
  }

  // GET ALL NOTICES - ADMIN
  async getAllNotices() {
    const notices = await this.repo.findAllNotices();

    return notices.map((notice) => this.formatNotice(notice));
  }

  // GET PUBLISHED NOTICES - PUBLIC
  async getPublishedNotices() {
    const notices = await this.repo.findPublishedNotices();

    return notices.map((notice) => this.formatNotice(notice));
  }

  // GET NOTICE BY ID
  async getNoticeById(id: string) {
    const notice = await this.repo.findNoticeById(id);

    if (!notice) {
      throw new ApiError(404, 'Notice not found');
    }

    return this.formatNotice(notice);
  }

  // UPDATE NOTICE
  async updateNotice(id: string, data: updateNoticeSchemaDTO, file?: Express.Multer.File) {
    const notice = await this.repo.findNoticeById(id);

    if (!notice) {
      throw new ApiError(404, 'Notice not found');
    }

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    const oldImagePublicId = notice.imagePublicId;

    // Upload new image
    if (file) {
      const uploadedImage = await uploadToCloudinary(file, 'ieit/notices');

      imageUrl = uploadedImage.secure_url;
      imagePublicId = uploadedImage.public_id;
    }

    /*
     * If admin changes isPublished to true
     * and doesn't provide publishedAt,
     * use current time.
     */
    let publishedAt = data.publishedAt;

    if (data.isPublished === true && !publishedAt && !notice.publishedAt) {
      publishedAt = new Date();
    }

    try {
      const updatedNotice = await this.repo.updateNotice(id, {
        ...data,

        ...(publishedAt && {
          publishedAt,
        }),

        ...(file && {
          imageUrl,
          imagePublicId,
        }),
      });

      // Delete old image only after DB succeeds
      if (file && oldImagePublicId && oldImagePublicId !== imagePublicId) {
        try {
          await deleteFromCloudinary(oldImagePublicId);
        } catch (error) {
          console.error('Failed to delete old notice image:', error);
        }
      }

      return this.formatNotice(updatedNotice);
    } catch (error) {
      // DB failed -> delete newly uploaded image
      if (imagePublicId) {
        try {
          await deleteFromCloudinary(imagePublicId);
        } catch (cleanupError) {
          console.error('Failed to cleanup new notice image:', cleanupError);
        }
      }

      throw error;
    }
  }

  // DELETE NOTICE
  async deleteNotice(id: string) {
    const notice = await this.repo.findNoticeById(id);

    if (!notice) {
      throw new ApiError(404, 'Notice not found');
    }

    const deletedNotice = await this.repo.deleteNotice(id);

    // Delete Cloudinary image
    if (notice.imagePublicId) {
      try {
        await deleteFromCloudinary(notice.imagePublicId);
      } catch (error) {
        console.error('Failed to delete notice image:', error);
      }
    }

    return deletedNotice;
  }

  // FORMAT RESPONSE
  private formatNotice(notice: any):INoticeResponse {
    return {
      id: notice.id,
      title: notice.title,
      description: notice.description,
      imageUrl: notice.imageUrl,
      publishedAt: notice.publishedAt,
      expiresAt: notice.expiresAt,
      isPublished: notice.isPublished,
      createdAt: notice.createdAt,
      updatedAt: notice.updatedAt,
    };
  }
}
