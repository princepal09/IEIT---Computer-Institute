export interface UpdateSiteSettingsDTO {
  instituteName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  about?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

import { z } from 'zod';

export const updateSiteSettingsSchema = z.object({
  instituteName: z
    .string()
    .trim()
    .min(2, 'Institute name must be at least 2 characters')
    .max(100, 'Institute name must not exceed 100 characters')
    .optional(),

  email: z.string().trim().email('Invalid email address').optional(),

  phone: z.string().trim().max(20, 'Phone number is too long').optional(),

  whatsapp: z.string().trim().max(20, 'WhatsApp number is too long').optional(),

  about: z.string().trim().max(2000, 'About must not exceed 2000 characters').optional(),

  facebookUrl: z.string().trim().url('Invalid Facebook URL').optional(),

  instagramUrl: z.string().trim().url('Invalid Instagram URL').optional(),
});

export type UpdateSiteSettingsInput = z.infer<typeof updateSiteSettingsSchema>;
