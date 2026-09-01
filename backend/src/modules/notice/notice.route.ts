import express from 'express';

import {
  createNotice,
  deleteNotice,
  getAllNotices,
  getNoticeById,
  getPublishedNotices,
  updateNotice,
} from './notice.controller.js';

import { verifyUser } from '../../middlewares/auth.middleware.js';

import { authService } from '../auth/auth.container.js';

import { upload } from '../../middlewares/multer.middleware.js';

import { validate } from '../../middlewares/validate.middleware.js';

import { createNoticeSchema, updateNoticeSchema } from './notice.schema.js';

const router = express.Router();

//PUBLIC ROTES

// Get only published + non-expired notices
router.get('/published', getPublishedNotices);

// Get all notices
router.get('/all', verifyUser(authService), getAllNotices);

// Get notice by ID
router.get('/:noticeId', getNoticeById);

//ADMIN ROUTES


// Create notice
router.post(
  '/create',
  verifyUser(authService),
  upload.single('image'),
  validate(createNoticeSchema),
  createNotice,
);

// Update notice
router.patch(
  '/update/:noticeId',
  verifyUser(authService),
  upload.single('image'),
  validate(updateNoticeSchema),
  updateNotice,
);

// Delete notice
router.delete('/delete/:noticeId', verifyUser(authService), deleteNotice);

export default router;
