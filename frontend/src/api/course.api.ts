import api from "@/lib/axios";
import { CourseResponse, CoursesResponse } from "@/types/course";

export const getCourses = async (): Promise<CoursesResponse> => {
  const response = await api.get<CoursesResponse>("/course/all-courses");
  return response.data;
};

export const getCourseBySlug = async (courseSlug:string) : Promise<CourseResponse> => {
  const response = await api.get<CourseResponse>(`/course/slug/${courseSlug}`);
  return response.data;
};
