import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { loginUserSchema, updateProfileSchema } from './auth.schema.js';
import {
  getMe,
  loginController,
  logoutAllController,
  logoutController,
  refreshTokenController,
  updateProfile,
} from './auth.controller.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from './auth.container.js';
import { upload } from '../../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/login', validate(loginUserSchema), loginController);
router.get('/me', verifyUser(authService), getMe);
router.post('/refresh', refreshTokenController);
router.post('/logout', verifyUser(authService), logoutController);
router.post('/logout-all', verifyUser(authService), logoutAllController);
router.patch(
  '/update-profile',
  verifyUser(authService),
  upload.single('profileImage'),
  validate(updateProfileSchema),
  updateProfile,
);
export default router;
