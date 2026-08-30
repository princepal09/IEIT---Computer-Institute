import { Request, Response, NextFunction } from 'express';
import siteSettingsService from './siteSettings.container.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';

export const getSiteSettings = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const settings = await siteSettingsService.getSiteSettings();

    return res.status(200).json({
      success: true,
      message: 'Site settings fetched successfully',
      data: settings,
    });
  },
);

export const updateSiteSettings = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const settings = await siteSettingsService.updateSiteSettings(req.body, req.file);

    return res.status(200).json({
      success: true,
      message: 'Site settings updated successfully',
      data: settings,
    });
  },
);
