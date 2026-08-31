import { prisma } from '../../lib/prisma.js';
import { IBranchRepository } from './branch.interface.js';
import { createBranchSchemaDTO, updateBranchSchemaDTO } from './branch.schema.js';

export class BranchRepository implements IBranchRepository {
  async createBranch(
    data: createBranchSchemaDTO & { slug: string; imageUrl?: string; imagePublicId?: string },
  ): Promise<any> {
    return prisma.branch.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        whatsapp: data.whatsapp,
        mapUrl: data.mapUrl,
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
      },
    });
  }
  async findAllBranches(): Promise<any[]> {
    return prisma.branch.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include:{
        courses : {
          select : {
            course : true
          }
        }

      }
    });
  }

  async findBranchById(id: string): Promise<any | null> {
    return prisma.branch.findUnique({
      where: {
        id,
      },
      include : {
        courses : {
          select :{
            course : true
          }
        }
      }
    });
  }

  async findBranchBySlug(slug: string): Promise<any | null> {
    return prisma.branch.findUnique({
      where: {
        slug,
      },
      include : {
        courses : {
          select : {
            course : true
          }
        }
      }
    });
  }

  async findBranchByName(name: string): Promise<any | null> {
    return prisma.branch.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async updateBranch(
    id: string,
    data: updateBranchSchemaDTO & { slug?: string; imageUrl?: string; imagePublicId?: string },
  ): Promise<any> {
    return prisma.branch.update({
      where: {
        id,
      },
      data: {
        ...(data.name !== undefined && {
          name: data.name,
        }),

        ...(data.slug !== undefined && {
          slug: data.slug,
        }),

        ...(data.description !== undefined && {
          description: data.description,
        }),

        ...(data.address !== undefined && {
          address: data.address,
        }),

        ...(data.phone !== undefined && {
          phone: data.phone,
        }),

        ...(data.email !== undefined && {
          email: data.email,
        }),

        ...(data.whatsapp !== undefined && {
          whatsapp: data.whatsapp,
        }),

        ...(data.mapUrl !== undefined && {
          mapUrl: data.mapUrl,
        }),

        ...(data.openingTime !== undefined && {
          openingTime: data.openingTime,
        }),

        ...(data.closingTime !== undefined && {
          closingTime: data.closingTime,
        }),

        ...(data.isActive !== undefined && {
          isActive: data.isActive,
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

  async deleteBranch(id: string): Promise<any> {
    return prisma.branch.delete({
      where: {
        id,
      },
    });
  }

  // BRANCH__COURSE

  async findCourseById(courseId: string): Promise<any | null> {
    return prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
  }

  async findBranchCourse(branchId: string, courseId: string): Promise<any | null> {
    return prisma.branchCourse.findUnique({
      where: {
        branchId_courseId: {
          branchId,
          courseId,
        },
      },
    });
  }

  async assignCourseToBranch(branchId: string, courseId: string): Promise<any> {
    return prisma.branchCourse.create({
      data: {
        branchId,
        courseId,
      },
    });
  }

  async removeCourseFromBranch(branchId: string, courseId: string): Promise<any> {
    return prisma.branchCourse.delete({
      where: {
        branchId_courseId: {
          branchId,
          courseId,
        },
      },
    });
  }

  async findCoursesByBranch(branchId: string): Promise<any[]> {
    const branchCourses = await prisma.branchCourse.findMany({
      where :{
        branchId
      },
      include: {
        course: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return branchCourses.map((branchCourse) => branchCourse.course);
  }
}
