import { Request, Response } from 'express';

import { asyncHandler } from '../../utils/AsyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';

import { dashboardService } from './dashboard.container.js';

export const getDashboard = asyncHandler(async (_req: Request, res: Response) => {
  const dashboard = await dashboardService.getDashboard();

  return res.status(200).json(new ApiResponse(200, dashboard, 'Dashboard fetched successfully'));
});
