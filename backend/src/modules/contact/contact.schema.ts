import { z } from 'zod';

export const createContactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  email: z
    .string()
    .trim()
    .email('Invalid email address'),

  phone: z
    .string()
    .trim()
    .max(20, 'Phone number is too long')
    .optional(),

  message: z
    .string()
    .trim()
    .min(5, 'Message must be at least 5 characters')
    .max(5000, 'Message must not exceed 5000 characters'),
});

export const updateContactMessageSchema = z.object({
  status: z.enum(['UNREAD', 'READ']),
});

export type createContactMessageSchemaDTO = z.infer<
  typeof createContactMessageSchema
>;

export type updateContactMessageSchemaDTO = z.infer<
  typeof updateContactMessageSchema
>;