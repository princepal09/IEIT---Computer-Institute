import express from 'express';
const router = express.Router();

import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from '../auth/auth.container.js';
import { getDashboard } from './dashboard.controller.js';

// ==========================================
// ADMIN DASHBOARD
// ==========================================

router.get('/', verifyUser(authService), getDashboard);

export default router;
