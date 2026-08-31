export interface INoticeResponse {
  id: string;

  title: string;

  description: string;

  imageUrl: string | null;

  publishedAt: Date | null;

  expiresAt: Date | null;

  isPublished: boolean;

  createdAt: Date;

  updatedAt: Date;
}