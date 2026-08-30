import { Router } from 'express';

import siteSettingsController from './siteSettings.container.js';

import { updateSiteSettingsSchema } from './siteSettings.schema.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from '../auth/auth.container.js';
import { upload } from '../../middlewares/multer.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';

const router = Router();

router.get('/get', siteSettingsController.getSiteSettings);

router.patch(
  '/update',
  verifyUser(authService),
  upload.single('logo'),
  validate(updateSiteSettingsSchema),
  siteSettingsController.updateSiteSettings,
);

export default router;
