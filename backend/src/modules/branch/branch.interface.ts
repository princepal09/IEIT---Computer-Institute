import { createBranchSchemaDTO, updateBranchSchemaDTO } from './branch.schema.js';

export interface IBranchRepository {
  createBranch(
    data: createBranchSchemaDTO & {
      slug: string;
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any>;

  findAllBranches(): Promise<any[]>;

  findBranchById(id: string): Promise<any | null>;

  findBranchBySlug(slug: string): Promise<any | null>;

  findBranchByName(name: string): Promise<any | null>;

  updateBranch(
    id: string,
    data: updateBranchSchemaDTO & { 
      slug?: string;
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any>;

  deleteBranch(id: string): Promise<any>;

  // BRANCH __ COURSE

  findCourseById(courseId:string):Promise<any | null>;

  findBranchCourse(branchId:string, courseId:string):Promise<any | null>;

  assignCourseToBranch(branchId:string, courseId:string):Promise<any>;
  
  removeCourseFromBranch(branchId:string, courseId:string):Promise<any>;

  findCoursesByBranch(branchId:string):Promise<any[]>
}
