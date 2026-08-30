import { SiteSettings } from '../../generated/prisma/client.js';
import { UpdateSiteSettingsDTO } from './siteSettings.schema.js';



export interface ISiteSettingsRepository {
  findSiteSettings(): Promise<SiteSettings | null>;

  createSiteSettings(
    data: UpdateSiteSettingsDTO & {
      logoUrl?: string;
      logoPublicId?: string;
    },
  ): Promise<SiteSettings>;

  updateSiteSettings(
    id: string,
    data: UpdateSiteSettingsDTO & {
      logoUrl?: string;
      logoPublicId?: string;
    },
  ): Promise<SiteSettings>;
}
