import { prisma } from '../../lib/prisma.js';
import { CreateGalleryData, IGalleryRepository } from './gallery.interface.js';

export class GalleryRepository implements IGalleryRepository {
  async createManyGallery(data: CreateGalleryData[]): Promise<void> {
    await prisma.gallery.createMany({
      data,
    });
  }
  async findAllGallery(): Promise<any[]> {
    return prisma.gallery.findMany({
      orderBy: [
        {
          displayOrder: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async findGalleryById(id: string): Promise<any | null> {
    return prisma.gallery.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteGallery(id: string): Promise<any> {
    return prisma.gallery.delete({
      where: {
        id,
      },
    });
  }
}
