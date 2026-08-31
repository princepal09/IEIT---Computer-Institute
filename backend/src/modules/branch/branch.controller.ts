import { asyncHandler } from '../../utils/AsyncHandler.js';
import { Request, Response } from 'express';
import { branchService } from './branch.container.js';
import ApiError from '../../utils/AppError.js';
import ApiResponse from '../../utils/ApiResponse.js';

export const createBranchController = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(404, 'file not found');
  }
  const branch = await branchService.createBranch(req.body, file);

  return res.status(201).json(new ApiResponse(201, branch, 'Branch Created Successfully'));
});

export const getAllBranches = asyncHandler(async (_req: Request, res: Response) => {
  const branches = await branchService.getAllBranches();

  return res.status(201).json(new ApiResponse(201, branches, 'Branches fetched successfully'));
});

export const getBranchByID = asyncHandler(async (req: Request, res: Response) => {
  const { branchId } = req.params;

  const branch = await branchService.getBranchById(branchId as string);

  return res.status(201).json(new ApiResponse(201, branch, 'Branch fetched successfully'));
});

export const getBranchBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { branchSlug } = req.params;

  const branch = await branchService.getBranchBySlug(branchSlug as string);

  return res.status(201).json(new ApiResponse(201, branch, 'Branch fetched successfully'));
});

export const updateBranch = asyncHandler(async (req: Request, res: Response) => {
  const { branchId } = req.params;

  const branch = await branchService.updateBranch(branchId as string, req.body, req.file);

  return res.status(201).json(new ApiResponse(201, branch, 'Branch updated successfully'));
});

export const deleteBranch = asyncHandler(async (req: Request, res: Response) => {
  const { branchId } = req.params;

  await branchService.deleteBranch(branchId as string);

  return res.status(201).json(new ApiResponse(201, null, 'Branch deleted successfully'));
});
