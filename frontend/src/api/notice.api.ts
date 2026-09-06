import api from "@/lib/axios";

import type {
  AdminNotice,
  CreateNoticePayload,
  NoticeResponse,
  NoticesResponse,
  PublicNotice,
  PublicNoticesResponse,
  UpdateNoticePayload,
} from "@/types/notice";

/*
 * Get all notices
 */
export const getAdminNotices = async (): Promise<AdminNotice[]> => {
  const response = await api.get<NoticesResponse>("/notices/all");

  return response.data.data;
};

/*
 * Get single notice
 */
export const getAdminNotice = async (
  noticeId: string
): Promise<AdminNotice> => {
  const response = await api.get<NoticeResponse>(`/notices/${noticeId}`);

  return response.data.data;
};

/*
 * Create notice
 */
export const createAdminNotice = async (
  data: CreateNoticePayload
): Promise<AdminNotice> => {
  const response = await api.post<NoticeResponse>("/notices/create", data);

  return response.data.data;
};

/*
 * Update notice
 */
export const updateAdminNotice = async (
  noticeId: string,
  data: UpdateNoticePayload
): Promise<AdminNotice> => {
  const response = await api.patch<NoticeResponse>(
    `/notices/update/${noticeId}`,
    data
  );

  return response.data.data;
};

/*
 * Delete notice
 */
export const deleteAdminNotice = async (
  noticeId: string
): Promise<AdminNotice> => {
  const response = await api.delete<NoticeResponse>(
    `/notices/delete/${noticeId}`
  );

  return response.data.data;
};


export const getPublishedNotices = async (): Promise<PublicNotice[]> => {
  const response = await api.get<PublicNoticesResponse>(
    "/notices/published"
  );

  return response.data.data;
};