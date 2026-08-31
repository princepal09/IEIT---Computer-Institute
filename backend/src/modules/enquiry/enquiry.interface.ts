import {
  createEnquirySchemaDTO,
  updateEnquirySchemaDTO,
} from './enquiry.schema.js';

export interface IEnquiryRepository {
  createEnquiry(
    data: createEnquirySchemaDTO,
  ): Promise<any>;

  findAllEnquiries(): Promise<any[]>;

  findEnquiryById(
    id: string,
  ): Promise<any | null>;

  updateEnquiry(
    id: string,
    data: updateEnquirySchemaDTO,
  ): Promise<any>;

  deleteEnquiry(
    id: string,
  ): Promise<any>;

  findBranchById(
    branchId: string,
  ): Promise<any | null>;

  findCourseById(
    courseId: string,
  ): Promise<any | null>;

  findBranchCourse(
    branchId: string,
    courseId: string,
  ): Promise<any | null>;

  findActiveAdmins(): Promise<{ email: string }[]>;
}