import {
  createAdminCourse,
  CreateCoursePayload,
  deleteAdminCourse,
  getAdminCourseById,
  getAdminCourses,
  updateAdminCourse,
  UpdateCoursePayload,
} from "@/api/course.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const adminCourseKeys = {
  all: ["admin-courses"] as const,

  detail: (courseId: string) => 
    ["admin-courses", courseId] as const
};

// GETL ALL COURSES

export const useAdminCourses = () => {
  return useQuery({
    queryKey: adminCourseKeys.all,
    queryFn: getAdminCourses,
  });
};

//GEtSingle Course

export const useAdminCourse = (courseId: string) => {
  return useQuery({
    queryKey: adminCourseKeys.detail(courseId),
    queryFn: () => getAdminCourseById(courseId),
    enabled: Boolean(courseId),
  });
};

// CREATE COURSE

export const useCreateAdminCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCoursePayload) => createAdminCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminCourseKeys.all,
      });
    },
  });
};

// Update Course

export const useUpdateAdminCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      data,
    }: {
      courseId: string;
      data: UpdateCoursePayload;
    }) => updateAdminCourse(courseId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminCourseKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: adminCourseKeys.detail(variables.courseId),
      });
    },
  });
};

// DELETE COURSE
export const useDeleteAdminCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => deleteAdminCourse(courseId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminCourseKeys.all,
      });
    },
  });
};
