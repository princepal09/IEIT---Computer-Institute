import { prisma } from '../../lib/prisma.js';
import { IEnquiryRepository } from './enquiry.interface.js';
import { createEnquirySchemaDTO, updateEnquirySchemaDTO } from './enquiry.schema.js';

export class EnquiryRepository implements IEnquiryRepository {
  async createEnquiry(data: createEnquirySchemaDTO): Promise<any> {
    return prisma.enquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        branchId: data.branchId,
        courseId: data.courseId,
        message: data.message,
      },
      include: {
        branch: true,
        course: true,
      },
    });
  }

  async findAllEnquiries(): Promise<any[]> {
    return prisma.enquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      include: {
        branch: true,
        course: true,
      },
    });
  }

  async findEnquiryById(id: string): Promise<any | null> {
    return prisma.enquiry.findUnique({
      where: {
        id,
      },

      include: {
        branch: true,
        course: true,
      },
    });
  }

  async updateEnquiry(id: string, data: updateEnquirySchemaDTO): Promise<any> {
    return prisma.enquiry.update({
      where: {
        id,
      },

      data: {
        status: data.status,
      },

      include: {
        branch: true,
        course: true,
      },
    });
  }

  async deleteEnquiry(id: string): Promise<any> {
    return prisma.enquiry.delete({
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

  async findActiveAdmins(): Promise<{ email: string }[]> {
    return prisma.admin.findMany({
      where: {
        isActive: true,
      },
      select: {
        email: true,
      },
    });
  }
}
