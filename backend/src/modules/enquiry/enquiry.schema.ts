import { z } from 'zod';

export const createEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  phone: z.string().trim().min(7, 'Phone number is invalid').max(20, 'Phone number is too long'),

  email: z.string().trim().email('Invalid email address').optional(),

  branchId: z.string().uuid('Invalid branch ID'),

  courseId: z.string().uuid('Invalid course ID').optional(),

  message: z.string().trim().max(2000, 'Message must not exceed 2000 characters').optional(),
});

export const updateEnquirySchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CONVERTED', 'CLOSED']),
});

export type createEnquirySchemaDTO = z.infer<typeof createEnquirySchema>;

export type updateEnquirySchemaDTO = z.infer<typeof updateEnquirySchema>;
