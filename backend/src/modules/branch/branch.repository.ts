import { IBranchRepository } from './branch.interface.js';
import { createBranchSchemaDTO, updateBranchSchemaDTO } from './branch.schema.js';

export class BranchRepository implements IBranchRepository {
    
   async createBranch(data: createBranchSchemaDTO & { slug: string; imageUrl?: string; imagePublicId?: string; }): Promise<any> {
       
   }
    async findAllBranches(): Promise<any[]> {
        
    }

    async findBranchById(id: string): Promise<any | null> {
        
    }

    async findBranchBySlug(slug: string): Promise<any | null> {
        
    }
    async findBranchByName(name: string): Promise<any | null> {
        
    }

    
    async updateBranch(id: string, data: updateBranchSchemaDTO & { slug?: string; imageUrl?: string; imagePublicId?: string; }): Promise<any> {
        
    }

    async deleteBranch(id: string): Promise<any> {
        
    }
} 
