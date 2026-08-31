import ApiError from '../../utils/AppError.js';
import { IBranchRepository } from './branch.interface.js';
import { createBranchSchemaDTO, updateBranchSchemaDTO } from './branch.schema.js';
import { slugify } from '../../utils/slugify.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../../utils/cloudinary.helper.js';
import { IBranchResponse } from './branch.response.js';

export class BranchService {
  constructor(private repo: IBranchRepository) {}

  //CREATE

  async createBranch(data: createBranchSchemaDTO, file?: Express.Multer.File) {
    const existingBranch = await this.repo.findBranchByName(data.name);

    if (existingBranch) {
      throw new ApiError(409, 'Branch with this name already exists');
    }

    // General slug

    const slug = slugify(data.name);

    const existingSlug = await this.repo.findBranchBySlug(slug);
    if (existingSlug) {
      throw new ApiError(409, 'Branch with this slug already exists');
    }

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (file) {
      const updloadedImage = await uploadToCloudinary(file, 'ieit/branches');
      imageUrl = updloadedImage.secure_url;
      imagePublicId = updloadedImage.public_id;
    }

    try {
      const branch = await this.repo.createBranch({
        ...data,
        slug,
        imageUrl,
        imagePublicId,
      });

      return branch;
    } catch (err) {
      if (imagePublicId) {
        try {
          await deleteFromCloudinary(imagePublicId);
        } catch (cleanupError) {
          console.error('Failed to cleanup the uploaded image', cleanupError);
        }
      }
    }
  }

  // GET ALL BRANCHES
  async getAllBranches() {
    const branches = await this.repo.findAllBranches();
    return branches.map((branch) => this.formatBranch(branch));

  }

  //GET BY ID
  async getBranchById(id: string) {
    const branch = await this.repo.findBranchById(id);
    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }
    return this.formatBranch(branch);
  }

  async getBranchBySlug(slug: string) {
    const branch = await this.repo.findBranchBySlug(slug);
    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }

    return this.formatBranch(branch)
  }

  // UPDATE
  async updateBranch(id: string, data: updateBranchSchemaDTO, file?: Express.Multer.File) {
    const branch = await this.repo.findBranchById(id);

    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }

    let slug: string | undefined;

    if (data.name && data.name !== branch.name) {
      slug = slugify(data.name);

      const existingSlug = await this.repo.findBranchBySlug(slug);

      if (existingSlug && existingSlug.id !== id) {
        throw new ApiError(409, 'Branch with this name already exists');
      }
    }

    let imageUrl: string | undefined;

    let imagePublicId: string | undefined;

    const oldImagePublicId = branch.imagePublicId;

    if (file) {
      const uploadedImage = await uploadToCloudinary(file, 'ieit/branches');

      imageUrl = uploadedImage.secure_url;

      imagePublicId = uploadedImage.public_id;
    }

    let updatedBranch;

    try {
      updatedBranch = await this.repo.updateBranch(id, {
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
      if (imagePublicId) {
        try {
          await deleteFromCloudinary(imagePublicId);
        } catch (cleanupError) {
          console.error('Failed to cleanup new image:', cleanupError);
        }
      }

      throw error;
    }

    // Delete old image AFTER DB update
    if (file && oldImagePublicId && oldImagePublicId !== imagePublicId) {
      try {
        await deleteFromCloudinary(oldImagePublicId);
      } catch (error) {
        console.error('Failed to delete old image:', error);
      }
    }

    return updatedBranch;
  }

  //Delete branch
  async deleteBranch(id: string) {
    const branch = await this.repo.findBranchById(id);

    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }

    const deletedBranch = await this.repo.deleteBranch(id);

    if (branch.imagePublicId) {
      try {
        await deleteFromCloudinary(branch.imagePublicId);
      } catch (err) {
        console.error('Failed to delete branch image', err);
      }
    }

    return deletedBranch;
  }

  async assignCourseToBranch(branchId: string, courseId: string) {
    const branch = await this.repo.findBranchById(branchId);

    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }

    const course = await this.repo.findCourseById(courseId);

    if (!course) {
      throw new ApiError(404, 'Course not found');
    }

    const existing = await this.repo.findBranchCourse(branchId, courseId);
    if (existing) {
      throw new ApiError(409, 'Course is already assigned to this branch');
    }

    // CreateRelationship

    const branchCourse = await this.repo.assignCourseToBranch(branchId, courseId);

    return branchCourse;
  }

  async removeCourseFromBranch(branchId: string, courseId: string) {
    const branch = await this.repo.findBranchById(branchId);
    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }

    // Check relationship
    const branchCourse = await this.repo.findBranchCourse(branchId, courseId);

    if (!branchCourse) {
      throw new ApiError(404, 'Course is not assigned to this branch');
    }
    await this.repo.removeCourseFromBranch(branchId, courseId);
  }

  async getBranchCourses(branchId: string) {
    const branch = await this.repo.findBranchById(branchId);

    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }

    return this.repo.findCoursesByBranch(branchId);
  }

  private formatBranch(branch: any): IBranchResponse {
  return {
    id: branch.id,
    name: branch.name,
    slug: branch.slug,
    description: branch.description,
    address: branch.address,
    phone: branch.phone,
    email: branch.email,
    whatsapp: branch.whatsapp,
    mapUrl: branch.mapUrl,
    openingTime: branch.openingTime,
    closingTime: branch.closingTime,
    imageUrl: branch.imageUrl,
    isActive: branch.isActive,

    courses: branch.courses?.map((branchCourse: any) => ({
      id: branchCourse.course.id,
      name: branchCourse.course.name,
      slug: branchCourse.course.slug,
    })) ?? [],

    createdAt: branch.createdAt,
    updatedAt: branch.updatedAt,
  };
}
}
