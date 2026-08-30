import { prisma } from '../../lib/prisma.js';
import { ISiteSettingsRepository } from './siteSettings.interface.js';
import { UpdateSiteSettingsDTO } from './siteSettings.schema.js';

export class SiteSettingsRepository implements ISiteSettingsRepository {
  async findSiteSettings() {
    return prisma.siteSettings.findFirst();
  }

  async createSiteSettings(
    data: UpdateSiteSettingsDTO & {
      logoUrl?: string;
      logoPublicId?: string;
    },
  ) {
    return prisma.siteSettings.create({
      data: {
        instituteName: data.instituteName!,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        about: data.about,
        facebookUrl: data.facebookUrl,
        instagramUrl: data.instagramUrl,
        logoUrl: data.logoUrl,
        logoPublicId: data.logoPublicId,
      },
    });
  }

  async updateSiteSettings(
    id: string,
    data: UpdateSiteSettingsDTO & {
      logoUrl?: string;
      logoPublicId?: string;
    },
  ) {
    return prisma.siteSettings.update({
      where: {
        id,
      },
      data: {
        ...(data.instituteName !== undefined && {
          instituteName: data.instituteName,
        }),

        ...(data.email !== undefined && {
          email: data.email,
        }),

        ...(data.phone !== undefined && {
          phone: data.phone,
        }),

        ...(data.whatsapp !== undefined && {
          whatsapp: data.whatsapp,
        }),

        ...(data.about !== undefined && {
          about: data.about,
        }),

        ...(data.facebookUrl !== undefined && {
          facebookUrl: data.facebookUrl,
        }),

        ...(data.instagramUrl !== undefined && {
          instagramUrl: data.instagramUrl,
        }),

        ...(data.logoUrl !== undefined && {
          logoUrl: data.logoUrl,
        }),

        ...(data.logoPublicId !== undefined && {
          logoPublicId: data.logoPublicId,
        }),
      },
    });
  }
}
