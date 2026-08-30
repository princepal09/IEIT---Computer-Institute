import { Router } from 'express';
import { updateSiteSettingsSchema } from './siteSettings.schema.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from '../auth/auth.container.js';
import { upload } from '../../middlewares/multer.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { getSiteSettings, updateSiteSettings } from './siteSettings.controller.js';

const router = Router();

router.get('/get', getSiteSettings);

router.patch(
  '/update',
  verifyUser(authService),
  upload.single('logo'),
  validate(updateSiteSettingsSchema),
  updateSiteSettings,
);

export default router;
