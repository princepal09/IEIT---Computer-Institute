import {
  createAdminNotice,
  deleteAdminNotice,
  getAdminNotice,
  getAdminNotices,
  updateAdminNotice,
} from "@/api/notice.api";
import { CreateNoticePayload, UpdateNoticePayload } from "@/types/notice";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const adminNoticeKeys = {
  all: ["admin-notices"] as const,

  detail: (noticeId: string) => ["admin-notices", noticeId] as const,
};

/*
 * Get all notices
 */
export const useAdminNotices = () => {
  return useQuery({
    queryKey: adminNoticeKeys.all,
    queryFn: getAdminNotices,
  });
};

/*
 * Get single notice
 */
export const useAdminNotice = (noticeId: string) => {
  return useQuery({
    queryKey: adminNoticeKeys.detail(noticeId),
    queryFn: () => getAdminNotice(noticeId),
    enabled: Boolean(noticeId),
  });
};

/*
 * Create notice
 */
export const useCreateAdminNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNoticePayload) => createAdminNotice(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminNoticeKeys.all,
      });
    },
  });
};

/*
 * Update notice
 */
export const useUpdateAdminNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noticeId,
      data,
    }: {
      noticeId: string;
      data: UpdateNoticePayload;
    }) => updateAdminNotice(noticeId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminNoticeKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: adminNoticeKeys.detail(variables.noticeId),
      });
    },
  });
};

/*
 * Delete notice
 */
export const useDeleteAdminNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noticeId: string) => deleteAdminNotice(noticeId),

    onSuccess: (_, noticeId) => {
      queryClient.invalidateQueries({
        queryKey: adminNoticeKeys.all,
      });

      queryClient.removeQueries({
        queryKey: adminNoticeKeys.detail(noticeId),
      });
    },
  });
};
