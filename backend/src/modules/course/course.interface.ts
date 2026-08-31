import {
  createCourseSchemaDTO,
  updateCourseSchemaDTO,
} from './course.schema.js';

export interface ICourseRepository {
  createCourse(
    data: createCourseSchemaDTO & {
      slug: string;
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any>;

  findAllCourses(): Promise<any[]>;

  findCourseById(
    id: string,
  ): Promise<any | null>;

  findCourseBySlug(
    slug: string,
  ): Promise<any | null>;

  findCourseByName(
    name: string,
  ): Promise<any | null>;

  countCourseEnquiries(
    courseId: string,
  ): Promise<number>;

  updateCourse(
    id: string,
    data: updateCourseSchemaDTO & {
      slug?: string;
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any>;

  deleteCourse(
    id: string,
  ): Promise<any>;
}