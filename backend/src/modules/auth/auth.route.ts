import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from './auth.schema.js';
import {
  forgotPasswordController,
  getMe,
  loginController,
  logoutAllController,
  logoutController,
  refreshTokenController,
  resetPasswordController,
  updatePasswordController,
  updateProfile,
} from './auth.controller.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from './auth.container.js';
import { upload } from '../../middlewares/multer.middleware.js';
import { forgotPasswordRateLimiter, loginRateLimiter } from '../../middlewares/rate-limit.middleware.js';

const router = express.Router();

router.post('/admin/login', loginRateLimiter, validate(loginUserSchema), loginController);
router.get('/admin/me', verifyUser(authService), getMe);
router.post('/admin/refresh', refreshTokenController);
router.post('/admin/logout', verifyUser(authService), logoutController);
router.post('/admin/logout-all', verifyUser(authService), logoutAllController);
router.patch(
  '/admin/update-profile',
  verifyUser(authService),
  upload.single('profileImage'),
  validate(updateProfileSchema),
  updateProfile,
);
router.patch(
  '/admin/change-password',
  verifyUser(authService),
  validate(updatePasswordSchema),
  updatePasswordController,
);

router.post('/admin/forgot-password', forgotPasswordRateLimiter, validate(forgotPasswordSchema), forgotPasswordController);
router.post('/admin/reset-password', validate(resetPasswordSchema), resetPasswordController);
export default router;
