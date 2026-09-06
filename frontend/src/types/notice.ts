export interface AdminNotice {
  id: string;

  title: string;

  description: string;

  imageUrl?: string | null;

  publishedAt?: string | null;

  expiresAt?: string | null;

  isPublished: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface NoticesResponse {
  success: boolean;
  message: string;
  data: AdminNotice[];
}

export interface NoticeResponse {
  success: boolean;
  message: string;
  data: AdminNotice;
}

export interface CreateNoticePayload {
  title: string;
  description: string;
  publishedAt?: string;
  expiresAt?: string;
  isPublished?: boolean;
}

export interface UpdateNoticePayload {
  title?: string;
  description?: string;
  publishedAt?: string;
  expiresAt?: string;
  isPublished?: boolean;
}

export interface PublicNotice {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  publishedAt?: string | null;
  expiresAt?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicNoticesResponse {
  success: boolean;
  message: string;
  data: PublicNotice[];
}