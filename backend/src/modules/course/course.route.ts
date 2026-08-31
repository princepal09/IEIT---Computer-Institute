import express from 'express';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getCourseBySlug,
  updateCourse,
} from './course.controller.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from '../auth/auth.container.js';
import { createCourseSchema, updateCourseSchema } from './course.schema.js';
import { upload } from '../../middlewares/multer.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
const router = express.Router();

//PUBLIC ROUTES

// Get all courses
router.get('/all-courses', getAllCourses);

// Get course by slug
router.get('/slug/:courseSlug', getCourseBySlug);

// Get course by ID
router.get('/:courseId', getCourseById);

//ADMIN ROUTES

// Create course
router.post(
  '/create',
  verifyUser(authService),
  upload.single('image'),
  validate(createCourseSchema),
  createCourse,
);

// Update course
router.patch(
  '/update/:courseId',
  verifyUser(authService),
  upload.single('image'),
  validate(updateCourseSchema),
  updateCourse,
);

// Delete course
router.delete('/delete/:courseId', verifyUser(authService), deleteCourse);

export default router;
