import { sendEnquiryAdminEmail } from '../../emails/services/enquiry-admin.email.js';
import { sendEnquiryStudentEmail } from '../../emails/services/enquiry-student.email.js';
import ApiError from '../../utils/AppError.js';
import { IEnquiryRepository } from './enquiry.interface.js';
import { createEnquirySchemaDTO, updateEnquirySchemaDTO } from './enquiry.schema.js';

export class EnquiryService {
  constructor(private readonly repo: IEnquiryRepository) {}

  //CREATE ENQUIRY

  async createEnquiry(data: createEnquirySchemaDTO) {
    const branch = await this.repo.findBranchById(data.branchId);
    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }

    //Check branch is active or not

    if (!branch.isActive) {
      throw new ApiError(400, 'This branch is currently inactive');
    }

    if (data.courseId) {
      const course = await this.repo.findCourseById(data.courseId);

      if (!course) {
        throw new ApiError(404, 'Course not found');
      }

      // ----------------------------------------
      // 4. Check course is active
      // ----------------------------------------

      if (!course.isActive) {
        throw new ApiError(400, 'This course is currently inactive');
      }

      const branchCourse = await this.repo.findBranchCourse(data.branchId, data.courseId);

      if (!branchCourse) {
        throw new ApiError(400, 'This course is not available at the selected branch');
      }
    }

    const enquiry = await this.repo.createEnquiry(data);

    const formattedEnquiry = this.formatEnquiry(enquiry);

    try {
      await sendEnquiryAdminEmail(formattedEnquiry);

      await sendEnquiryStudentEmail(formattedEnquiry);
    } catch (error) {
      console.error('Failed to send enquiry email:', error);
    }

    return formattedEnquiry;
  }

  //GET ALL ENQUIRIES
  async getAllEnquries() {
    const enquiries = await this.repo.findAllEnquiries();
    return enquiries.map((enquiry) => this.formatEnquiry(enquiry));
  }

  //GET ENQUIRY BY ID
  async getEnquiryById(id: string) {
    const enquiry = await this.repo.findEnquiryById(id);
    if (!enquiry) {
      throw new ApiError(404, 'Enquiry not found');
    }

    return this.formatEnquiry(enquiry);
  }

  //UPDATE ENQUIRY
  async updateEnquiry(id: string, data: updateEnquirySchemaDTO) {
    const enquiry = await this.repo.findEnquiryById(id);
    if (!enquiry) {
      throw new ApiError(404, 'Enquiry not found');
    }

    const updatedEnquiry = await this.repo.updateEnquiry(id, data);
    return this.formatEnquiry(updatedEnquiry);
  }

  async deleteEnquiry(id: string) {
    const enquiry = await this.repo.findEnquiryById(id);

    if (!enquiry) {
      throw new ApiError(404, 'Enquiry not found');
    }

    return this.repo.deleteEnquiry(id);
  }

  private formatEnquiry(enquiry: any) {
    return {
      id: enquiry.id,
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
      branchId: enquiry.branchId,
      courseId: enquiry.courseId,
      message: enquiry.message,
      status: enquiry.status,
      createdAt: enquiry.createdAt,
      updatedAt: enquiry.updatedAt,

      branch: enquiry.branch
        ? {
            id: enquiry.branch.id,
            name: enquiry.branch.name,
            slug: enquiry.branch.slug,
          }
        : null,

      course: enquiry.course
        ? {
            id: enquiry.course.id,
            name: enquiry.course.name,
            slug: enquiry.course.slug,
          }
        : null,
    };
  }
}
