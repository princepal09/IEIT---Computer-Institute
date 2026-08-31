import ApiError from '../../utils/AppError.js';
import { IBranchRepository } from './branch.interface.js';
import { createBranchSchemaDTO, updateBranchSchemaDTO } from './branch.schema.js';
import { slugify } from '../../utils/slugify.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../../utils/cloudinary.helper.js';

export class BranchService {
  constructor(private repo: IBranchRepository) {}

  //CREATE

  async createBranch(data: createBranchSchemaDTO, file: Express.Multer.File) {
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
    return this.repo.findAllBranches();
  }

  //GET BY ID
  async getBranchById(id: string) {
    const branch = await this.repo.findBranchById(id);
    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }
    return branch;
  }

  async getBranchBySlug(slug: string) {
    const branch = await this.repo.findBranchBySlug(slug);
    if (!branch) {
      throw new ApiError(404, 'Branch not found');
    }

    return branch;
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
  async deleteBranch(id:string){
    const branch = await this.repo.findBranchById(id);

    if(!branch){
      throw new ApiError(404,"Branch not found")
    }

    const deletedBranch = await this.repo.deleteBranch(id);

    if(branch.imagePublicId){
      try{
        await deleteFromCloudinary(branch.imagePublicId);
      }catch(err){
        console.error('Failed to delete branch image', err)
      }
    }

    return deletedBranch;
  }

  
}
