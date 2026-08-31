import { prisma } from "../../lib/prisma.js";
import { INoticeRepository } from "./notice.interface.js";
import { createNoticeSchemaDTO, updateNoticeSchemaDTO } from "./notice.schema.js";


export class NoticeRepository implements INoticeRepository {
  // CREATE
  async createNotice(
    data: createNoticeSchemaDTO & {
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any> {
    return prisma.notice.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
        publishedAt: data.publishedAt,
        expiresAt: data.expiresAt,
        isPublished: data.isPublished ?? false,
      },
    });
  }

  // GET ALL - ADMIN
  async findAllNotices(): Promise<any[]> {
    return prisma.notice.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // GET PUBLISHED - PUBLIC
  async findPublishedNotices(): Promise<any[]> {
    const now = new Date();

    return prisma.notice.findMany({
      where: {
        isPublished: true,

        OR: [
          {
            expiresAt: null,
          },
          {
            expiresAt: {
              gt: now,
            },
          },
        ],
      },

      orderBy: [
        {
          publishedAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  // GET BY ID
  async findNoticeById(id: string): Promise<any | null> {
    return prisma.notice.findUnique({
      where: {
        id,
      },
    });
  }

  // UPDATE
  async updateNotice(
    id: string,
    data: updateNoticeSchemaDTO & {
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any> {
    return prisma.notice.update({
      where: {
        id,
      },

      data: {
        ...(data.title !== undefined && {
          title: data.title,
        }),

        ...(data.description !== undefined && {
          description: data.description,
        }),

        ...(data.publishedAt !== undefined && {
          publishedAt: data.publishedAt,
        }),

        ...(data.expiresAt !== undefined && {
          expiresAt: data.expiresAt,
        }),

        ...(data.isPublished !== undefined && {
          isPublished: data.isPublished,
        }),

        ...(data.imageUrl !== undefined && {
          imageUrl: data.imageUrl,
        }),

        ...(data.imagePublicId !== undefined && {
          imagePublicId: data.imagePublicId,
        }),
      },
    });
  }

  // DELETE
  async deleteNotice(id: string): Promise<any> {
    return prisma.notice.delete({
      where: {
        id,
      },
    });
  }
}
