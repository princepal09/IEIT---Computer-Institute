import { CourseRepository } from './course.repository.js';
import { CourseService } from './course.service.js';

const courseRepository = new CourseRepository();

const courseService = new CourseService(courseRepository);

export default courseService;
