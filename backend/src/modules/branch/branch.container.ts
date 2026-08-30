import { BranchRepository } from "./branch.repository.js";
import { BranchService } from "./branch.service.js";



const branchRepository = new BranchRepository()
const branchService = new BranchService(branchRepository)

export {branchService}
