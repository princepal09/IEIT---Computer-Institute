import api from "@/lib/axios";
import { CourseResponse, CoursesResponse } from "@/types/course";
import { AdminCourse } from "@/types/coursesDashboard";


export interface CreateCoursePayload {
  name: string;
  shortDescription: string;
  description: string;
  duration: string;
  eligibility: string;
  fee: number;
  category: string;
}

export interface UpdateCoursePayload {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  duration: string;
  eligibility: string;
  fee: number;
  category: string;
}

export const getCourses = async (): Promise<CoursesResponse> => {
  const response = await api.get<CoursesResponse>("/course/all-courses");
  return response.data;
};

export const getCourseBySlug = async (courseSlug:string) : Promise<CourseResponse> => {
  const response = await api.get<CourseResponse>(`/course/slug/${courseSlug}`);
  return response.data;
};

export const getAdminCourses = async (): Promise<AdminCourse[]> => {
  const response = await api.get("/course/all-courses");
  return response.data.data;
}
export const getAdminCourseById = async (courseId : string): Promise<AdminCourse> => {
  const response = await api.get(`/course/${courseId}`);
  return response.data.data;
}

export const createAdminCourse = async (data : CreateCoursePayload): Promise<AdminCourse> => {
  const response = await api.post(`/course/create`, data);
  return response.data.data;
}

export const updateAdminCourse = async (courseId : string, data : CreateCoursePayload): Promise<AdminCourse> => {
  const response = await api.patch(`/course/update/${courseId}`, data);
  return response.data.data;
}

export const deleteAdminCourse = async (courseId : string): Promise<AdminCourse> => {
  const response = await api.delete(`/course/delete/${courseId}`);
  return response.data.data;
}

