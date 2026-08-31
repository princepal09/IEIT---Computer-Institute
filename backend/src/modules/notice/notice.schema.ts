import { z } from 'zod';

export const createNoticeSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, 'Notice title must be at least 2 characters')
      .max(200, 'Notice title must not exceed 200 characters'),

    description: z
      .string()
      .trim()
      .min(2, 'Notice description is required')
      .max(5000, 'Description must not exceed 5000 characters'),

    publishedAt: z.preprocess((value) => {
      if (value === '' || value === undefined) {
        return undefined;
      }

      return new Date(value as string);
    }, z.date().optional()),

    expiresAt: z.preprocess((value) => {
      if (value === '' || value === undefined) {
        return undefined;
      }

      return new Date(value as string);
    }, z.date().optional()),

    isPublished: z.preprocess((value) => {
      if (value === 'true') return true;
      if (value === 'false') return false;

      return value;
    }, z.boolean().optional()),
  })
  .refine(
    (data) => {
      if (data.publishedAt && data.expiresAt) {
        return data.expiresAt > data.publishedAt;
      }

      return true;
    },
    {
      message: 'Expiry date must be after published date',
      path: ['expiresAt'],
    },
  );

export const updateNoticeSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, 'Notice title must be at least 2 characters')
      .max(200, 'Notice title must not exceed 200 characters')
      .optional(),

    description: z
      .string()
      .trim()
      .min(2, 'Notice description is required')
      .max(5000, 'Description must not exceed 5000 characters')
      .optional(),

    publishedAt: z.preprocess((value) => {
      if (value === '' || value === undefined) {
        return undefined;
      }

      return new Date(value as string);
    }, z.date().optional()),

    expiresAt: z.preprocess((value) => {
      if (value === '' || value === undefined) {
        return undefined;
      }

      return new Date(value as string);
    }, z.date().optional()),

    isPublished: z.preprocess((value) => {
      if (value === 'true') return true;
      if (value === 'false') return false;

      return value;
    }, z.boolean().optional()),
  })
  .refine(
    (data) => {
      if (data.publishedAt && data.expiresAt) {
        return data.expiresAt > data.publishedAt;
      }

      return true;
    },
    {
      message: 'Expiry date must be after published date',
      path: ['expiresAt'],
    },
  );

export type createNoticeSchemaDTO = z.infer<typeof createNoticeSchema>;

export type updateNoticeSchemaDTO = z.infer<typeof updateNoticeSchema>;
