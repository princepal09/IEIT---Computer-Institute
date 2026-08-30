import ApiError from '../../utils/AppError.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../../utils/cloudinary.helper.js';
import { ISiteSettingsRepository } from './siteSettings.interface.js';
import { ISiteSettingsResponse } from './siteSettings.response.js';
import { UpdateSiteSettingsDTO } from './siteSettings.schema.js';

export class SiteSettingsService {
  constructor(private readonly repo: ISiteSettingsRepository) {}

  async getSiteSettings(): Promise<ISiteSettingsResponse> {
    const settings = await this.repo.findSiteSettings();

    if (!settings) {
      throw new ApiError(404, 'Site settings not found');
    }

    return settings;
  }

  async updateSiteSettings(
    data: UpdateSiteSettingsDTO,
    file?: Express.Multer.File,
  ): Promise<ISiteSettingsResponse> {
    const settings = await this.repo.findSiteSettings();

    if (!settings) {
      throw new ApiError(404, 'Site settings not found');
    }

    let logoUrl = settings.logoUrl ?? undefined;
    let logoPublicId = settings.logoPublicId ?? undefined;

    let oldLogoPublicId: string | undefined;
   
    if (file) {
      const uploadedImage = await uploadToCloudinary(file, 'ieit/site-settings');

      logoUrl = uploadedImage.secure_url;
      logoPublicId = uploadedImage.public_id;

      oldLogoPublicId = settings.logoPublicId ?? undefined;
    }

    const updatedSettings = await this.repo.updateSiteSettings(settings.id, {
      ...data,
      ...(file && {
        logoUrl,
        logoPublicId,
      }),
    });
   
    if (file && oldLogoPublicId && oldLogoPublicId !== logoPublicId) {
      try {
        await deleteFromCloudinary(oldLogoPublicId);
      } catch (error) {
       
        console.error('Failed to delete old site logo:', error);
      }
    }

    return updatedSettings;
  }
}
