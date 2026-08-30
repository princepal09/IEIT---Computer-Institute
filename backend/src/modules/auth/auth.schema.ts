import { z } from 'zod';

export const loginUserSchema = z
  .object({
    email: z.email('Email is required'),
    password: z.string().min(6, 'Password must be atlease 6 characters long'),
  })
  .strict();

export const refreshTokenSchema = z
  .object({
    token: z.string(),
  })
  .strict();

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .optional(),
  })
  .strict();

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Password must be atlease 6 characters long'),
    newPassword: z.string().min(6, 'Password must be atlease 6 characters long'),
  })
  .strict();

export type loginUserDTO = z.infer<typeof loginUserSchema>;
export type refreshTokenDTO = z.infer<typeof refreshTokenSchema>;
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
export type updatePasswordDTO = z.infer<typeof updatePasswordSchema>;
