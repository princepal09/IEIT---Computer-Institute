import { CACHE_KEYS } from '../../constants/cache-key.js';
import ApiError from '../../utils/AppError.js';
import { deleteCache, getCache, setCache } from '../../utils/cache.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../../utils/cloudinary.helper.js';
import { slugify } from '../../utils/slugify.js';
import { ICourseRepository } from './course.interface.js';
import { ICourseResponse } from './course.response.js';
import { createCourseSchemaDTO, updateCourseSchemaDTO } from './course.schema.js';

export class CourseService {
  constructor(private readonly repo: ICourseRepository) {}

  async createCourse(data: createCourseSchemaDTO, file?: Express.Multer.File) {
    const existingCourse = await this.repo.findCourseByName(data.name);

    if (existingCourse) {
      throw new ApiError(409, 'Course with this name already exists');
    }

    const slug = slugify(data.name);

    const existingSlug = await this.repo.findCourseBySlug(slug);

    if (existingSlug) {
      throw new ApiError(409, 'Course with this slug already exists');
    }

    // ---------------------------------------
    // Validate branches
    // ---------------------------------------

    if (data.branchIds && data.branchIds.length > 0) {
      // Remove duplicate branch IDs
      const uniqueBranchIds = [...new Set(data.branchIds)];

      if (uniqueBranchIds.length !== data.branchIds.length) {
        throw new ApiError(400, 'Duplicate branch IDs are not allowed');
      }

      for (const branchId of uniqueBranchIds) {
        const branch = await this.repo.findBranchById(branchId);

        if (!branch) {
          throw new ApiError(404, `Branch not found: ${branchId}`);
        }

        if (!branch.isActive) {
          throw new ApiError(400, `Branch is inactive: ${branch.name}`);
        }
      }
    }

    // ---------------------------------------
    // Upload image
    // ---------------------------------------

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (file) {
      const uploadedImage = await uploadToCloudinary(file, 'ieit/courses');

      imageUrl = uploadedImage.secure_url;

      imagePublicId = uploadedImage.public_id;
    }

    // ---------------------------------------
    // Create Course + BranchCourse
    // ---------------------------------------

    try {
      const course = await this.repo.createCourse({
        ...data,
        slug,
        imageUrl,
        imagePublicId,
      });

      await deleteCache(CACHE_KEYS.COURSES);
      return this.formatCourse(course);
    } catch (error) {
      // DB failed after Cloudinary upload
      if (imagePublicId) {
        try {
          await deleteFromCloudinary(imagePublicId);
        } catch (cleanupError) {
          console.error('Failed to cleanup uploaded course image:', cleanupError);
        }
      }

      throw error;
    }
  }

  //Get Course By Id

  async getCourseById(id: string) {
    const course = await this.repo.findCourseById(id);

    if (!course) {
      throw new ApiError(404, 'Course not found');
    }

    return this.formatCourse(course);
  }

  //GEt course by slug

  async getCourseBySlug(slug: string) {
    const course = await this.repo.findCourseBySlug(slug);

    if (!course) {
      throw new ApiError(404, 'Course not found');
    }

    return this.formatCourse(course);
  }

  //Update Course
  async updateCourse(id: string, data: updateCourseSchemaDTO, file?: Express.Multer.File) {
    // Find existing course
    const course = await this.repo.findCourseById(id);

    if (!course) {
      throw new ApiError(404, 'Course not found');
    }

    let slug: string | undefined;

    // If name changes
    if (data.name && data.name !== course.name) {
      slug = slugify(data.name);

      const existingSlug = await this.repo.findCourseBySlug(slug);

      if (existingSlug && existingSlug.id !== id) {
        throw new ApiError(409, 'Course with this name already exists');
      }
    }

    let imageUrl: string | undefined;

    let imagePublicId: string | undefined;

    const oldImagePublicId = course.imagePublicId;

    // Upload new image
    if (file) {
      const uploadedImage = await uploadToCloudinary(file, 'ieit/courses');

      imageUrl = uploadedImage.secure_url;

      imagePublicId = uploadedImage.public_id;
    }

    let updatedCourse;

    try {
      updatedCourse = await this.repo.updateCourse(id, {
        ...data,

        ...(slug && {
          slug,
        }),

        ...(file && {
          imageUrl,
          imagePublicId,
        }),
      });
    } catch (error) {
      // DB update failed
      // Remove newly uploaded image
      if (imagePublicId) {
        try {
          await deleteFromCloudinary(imagePublicId);
        } catch (cleanupError) {
          console.error('Failed to cleanup new course image:', cleanupError);
        }
      }

      throw error;
    }

    // Delete OLD image only after DB update succeeds
    if (file && oldImagePublicId && oldImagePublicId !== imagePublicId) {
      try {
        await deleteFromCloudinary(oldImagePublicId);
      } catch (error) {
        console.error('Failed to delete old course image:', error);
      }
    }

    await deleteCache(CACHE_KEYS.COURSES);
    return this.formatCourse(updatedCourse);
  }

  //Delete Course
  async deleteCourse(id: string) {
    const course = await this.repo.findCourseById(id);

    if (!course) {
      throw new ApiError(404, 'Course not found');
    }

    const enquiryCount = await this.repo.countCourseEnquiries(id);

    if (enquiryCount > 0) {
      throw new ApiError(
        409,
        'Cannot delete course because it has enquiries. Deactivate it instead.',
      );
    }
    const deletedCourse = await this.repo.deleteCourse(id);

    //Delete Cloudinary Image
    if (course.imagePublicId) {
      try {
        await deleteFromCloudinary(course.imagePublicId);
      } catch (err) {
        console.error('Failed to delete course image:', err);
      }
    }

    await deleteCache(CACHE_KEYS.COURSES);
    return deletedCourse;
  }

  //GET ALL COURSES
  async getAllCourses() {
    const cachedBranches = await getCache<ICourseResponse[]>(CACHE_KEYS.COURSES);

    if (cachedBranches) {
      return cachedBranches;
    }
    const courses = await this.repo.findAllCourses();
    const formattedCourse = courses.map((course) => this.formatCourse(course));

    await setCache(CACHE_KEYS.COURSES, formattedCourse, 10 * 60);
    return formattedCourse;
  }

  //For Format Course

  private formatCourse(course: any) {
    return {
      id: course.id,
      name: course.name,
      slug: course.slug,
      shortDescription: course.shortDescription,
      description: course.description,
      duration: course.duration,
      eligibility: course.eligibility,

      // Decimal → string
      fee: course.fee !== null ? course.fee.toString() : null,


      category: course.category,
      originalFee: course.originalFee,
      discountPercent : course.discountPercent,

      imageUrl: course.imageUrl,

      isActive: course.isActive,
      branches:
        course.branches?.map((item: any) => ({
          id: item.branch.id,
          name: item.branch.name,
          slug: item.branch.slug,
        })) ?? [],

      createdAt: course.createdAt,

      updatedAt: course.updatedAt,
    };
  }
}
