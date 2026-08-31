import { prisma } from '../../lib/prisma.js';

import { ICourseRepository } from './course.interface.js';
import { createCourseSchemaDTO, updateCourseSchemaDTO } from './course.schema.js';

export class CourseRepository implements ICourseRepository {
  async createCourse(
    data: createCourseSchemaDTO & {
      slug: string;
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any> {
    return prisma.$transaction(async (tx) => {
      // 1. Create Course
      const course = await tx.course.create({
        data: {
          name: data.name,
          slug: data.slug,
          shortDescription: data.shortDescription,
          description: data.description,
          duration: data.duration,
          eligibility: data.eligibility,
          fee: data.fee,
          category: data.category,
          imageUrl: data.imageUrl,
          imagePublicId: data.imagePublicId,
        },
      });

      // 2. Create BranchCourse relationships
      if (data.branchIds && data.branchIds.length > 0) {
        await tx.branchCourse.createMany({
          data: data.branchIds.map((branchId) => ({
            branchId,
            courseId: course.id,
          })),
        });
      }
      // 3. Return course with branches
      return tx.course.findUnique({
        where: {
          id: course.id,
        },

        include: {
          branches: {
            include: {
              branch: true,
            },
          },
        },
      });
    });
  }

  async findAllCourses(): Promise<any[]> {
    return prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include:{
        branches :{
          include : {
            branch : true
          }
        }
      }
    });
  }

  async findCourseById(id: string): Promise<any> {
    return prisma.course.findUnique({
      where: {
        id,
      },
      include:{
        branches: {
            include : {
              branch : true
            }
        }
      }
    });
  }

  async findCourseBySlug(slug: string): Promise<any | null> {
    return prisma.course.findUnique({
      where: {
        slug,
      },include :{
        branches : {
          include : {
            branch : true
          }
        }
      }
    });
  }

  async findCourseByName(name: string): Promise<any | null> {
    return prisma.course.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async countCourseEnquiries(courseId: string): Promise<number> {
    return prisma.enquiry.count({
      where: {
        courseId,
      },
    });
  }

  async updateCourse(
    id: string,
    data: updateCourseSchemaDTO & {
      slug?: string;
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any> {
    return prisma.course.update({
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

        ...(data.shortDescription !== undefined && {
          shortDescription: data.shortDescription,
        }),

        ...(data.description !== undefined && {
          description: data.description,
        }),

        ...(data.duration !== undefined && {
          duration: data.duration,
        }),

        ...(data.eligibility !== undefined && {
          eligibility: data.eligibility,
        }),

        ...(data.fee !== undefined && {
          fee: data.fee,
        }),

        ...(data.category !== undefined && {
          category: data.category,
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

  async deleteCourse(id: string): Promise<any> {
    return prisma.course.delete({
      where: {
        id,
      },
    });
  }

  async findBranchById(branchId: string): Promise<any | null> {
    return prisma.branch.findUnique({
      where: {
        id: branchId,
      },
    });
  }
}
