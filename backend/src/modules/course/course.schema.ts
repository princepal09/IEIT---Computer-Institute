import { z } from 'zod';

export const createCourseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Course name must be at least 2 characters')
    .max(150, 'Course name must not exceed 150 characters'),

  shortDescription: z
    .string()
    .trim()
    .max(500, 'Short description must not exceed 500 characters')
    .optional(),

  description: z
    .string()
    .trim()
    .max(5000, 'Description must not exceed 5000 characters')
    .optional(),

  duration: z.string().trim().max(100, 'Duration is too long').optional(),

  eligibility: z
    .string()
    .trim()
    .max(1000, 'Eligibility must not exceed 1000 characters')
    .optional(),

  fee: z.preprocess((value) => {
    if (value === '' || value === undefined) {
      return undefined;
    }

    if (typeof value === 'string') {
      return Number(value);
    }

    return value;
  }, z.number().nonnegative('Fee cannot be negative').optional()),

  category: z.string().trim().max(100, 'Category must not exceed 100 characters').optional(),

  branchIds: z.preprocess(
    (value) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }

      return value;
    },
    z.array(z.string().uuid('Invalid branch ID')).optional(),
  ),
});

export const updateCourseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Course name must be at least 2 characters')
    .max(150, 'Course name must not exceed 150 characters')
    .optional(),

  shortDescription: z
    .string()
    .trim()
    .max(500, 'Short description must not exceed 500 characters')
    .optional(),

  description: z
    .string()
    .trim()
    .max(5000, 'Description must not exceed 5000 characters')
    .optional(),

  duration: z.string().trim().max(100, 'Duration is too long').optional(),

  eligibility: z
    .string()
    .trim()
    .max(1000, 'Eligibility must not exceed 1000 characters')
    .optional(),

  fee: z.preprocess((value) => {
    if (value === '' || value === undefined) {
      return undefined;
    }

    if (typeof value === 'string') {
      return Number(value);
    }

    return value;
  }, z.number().nonnegative('Fee cannot be negative').optional()),

  category: z.string().trim().max(100, 'Category must not exceed 100 characters').optional(),

  isActive: z.preprocess((value) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  }, z.boolean().optional()),
});

export type createCourseSchemaDTO = z.infer<typeof createCourseSchema>;

export type updateCourseSchemaDTO = z.infer<typeof updateCourseSchema>;
