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

export type loginUserDTO = z.infer<typeof loginUserSchema>;
export type refreshTokenDTO = z.infer<typeof refreshTokenSchema>;
