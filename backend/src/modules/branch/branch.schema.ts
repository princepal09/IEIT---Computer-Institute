import { z } from 'zod';

export const createBranchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Branch name must be at least 2 characters')
    .max(100, 'Branch name must not exceed 100 characters'),

  description: z
    .string()
    .trim()
    .max(2000, 'Description must not exceed 2000 characters')
    .optional(),

  address: z
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must not exceed 500 characters'),

  phone: z.string().trim().max(20, 'Phone number is too long').optional(),

  email: z.string().trim().email('Invalid email address').optional(),

  whatsapp: z.string().trim().max(20, 'WhatsApp number is too long').optional(),

  mapUrl: z.string().trim().url('Invalid map URL').optional(),

  openingTime: z.string().trim().max(10, 'Opening time is invalid').optional(),

  closingTime: z.string().trim().max(10, 'Closing time is invalid').optional(),
});

export const updateBranchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Branch name must be at least 2 characters')
    .max(100, 'Branch name must not exceed 100 characters')
    .optional(),

  description: z
    .string()
    .trim()
    .max(2000, 'Description must not exceed 2000 characters')
    .optional(),

  address: z
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must not exceed 500 characters')
    .optional(),

  phone: z.string().trim().max(20, 'Phone number is too long').optional(),

  email: z.string().trim().email('Invalid email address').optional(),

  whatsapp: z.string().trim().max(20, 'WhatsApp number is too long').optional(),

  mapUrl: z.string().trim().url('Invalid map URL').optional(),

  openingTime: z.string().trim().max(10, 'Opening time is invalid').optional(),

  closingTime: z.string().trim().max(10, 'Closing time is invalid').optional(),

  isActive: z.boolean().optional(),
});

export type createBranchSchemaDTO = z.infer<typeof createBranchSchema>;
export type updateBranchSchemaDTO = z.infer<typeof updateBranchSchema>;
