import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { loginUserSchema } from './auth.schema.js';
import {
  getMe,
  loginController,
  logoutAllController,
  logoutController,
  refreshTokenController,
} from './auth.controller.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from './auth.container.js';

const router = express.Router();

router.post('/login', validate(loginUserSchema), loginController);
router.get('/me', verifyUser(authService), getMe);
router.post('/refresh', refreshTokenController);
router.post('/logout', verifyUser(authService), logoutController);
router.post('/logout-all', verifyUser(authService), logoutAllController);
export default router;
