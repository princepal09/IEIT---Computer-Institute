import { Request, Response, NextFunction } from 'express';

import { SiteSettingsService } from './siteSettings.service.js';

export class SiteSettingsController {
  constructor(private readonly service: SiteSettingsService) {}

  getSiteSettings = async (_req: Request, res: Response, _next: NextFunction) => {
    const settings = await this.service.getSiteSettings();

    return res.status(200).json({
      success: true,
      message: 'Site settings fetched successfully',
      data: settings,
    });
  };

  updateSiteSettings = async (req: Request, res: Response, _next: NextFunction) => {
    const settings = await this.service.updateSiteSettings(req.body, req.file);

    return res.status(200).json({
      success: true,
      message: 'Site settings updated successfully',
      data: settings,
    });
  };
}
