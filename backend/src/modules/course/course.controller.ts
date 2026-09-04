import { Request, Response } from 'express';
import courseService from './course.container.js';
import ApiError from '../../utils/AppError.js';
import ApiResponse from '../../utils/ApiResponse.js';

export const createCourse = async (req: Request, res: Response) => {
  const file = req.file;
 
  const course = await courseService.createCourse(req.body, file);

  return res.status(201).json(new ApiResponse(201, course, 'Course Created Successfully'));
};

export const getAllCourses = async (_req: Request, res: Response) => {
  const courses = await courseService.getAllCourses();

  return res.status(200).json(new ApiResponse(200, courses, 'Courses fetched Successfully'));
};

export const getCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  if (!courseId) {
    throw new ApiError(404, 'CourseId not found');
  }
  const course = await courseService.getCourseById(courseId);

  return res.status(200).json(new ApiResponse(200, course, 'Course fetched Successfully'));
};

export const getCourseBySlug = async (req: Request, res: Response) => {
  const courseSlug = req.params.courseSlug as string;

  if (!courseSlug) {
    throw new ApiError(404, 'CourseSlug not found');
  }
  const course = await courseService.getCourseBySlug(courseSlug);

  return res.status(200).json(new ApiResponse(200, course, 'Course fetched Successfully'));
};
export const updateCourse = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  if (!courseId) {
    throw new ApiError(404, 'CourseId not found');
  }
  const file = req.file;
 
  const course = await courseService.updateCourse(courseId, req.body, file);

  return res.status(200).json(new ApiResponse(200, course, 'Course updated Successfully'));
};

export const deleteCourse = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  if (!courseId) {
    throw new ApiError(404, 'CourseId not found');
  }
  await courseService.deleteCourse(courseId);

  return res.status(200).json(new ApiResponse(200, null, 'Course deleted Successfully'));
};