import { createNoticeSchemaDTO, updateNoticeSchemaDTO } from "./notice.schema.js";

export interface INoticeRepository {
  createNotice(
    data: createNoticeSchemaDTO & {
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any>;

  findAllNotices(): Promise<any[]>;

  findPublishedNotices(): Promise<any[]>;

  findNoticeById(id: string): Promise<any | null>;

  updateNotice(
    id: string,
    data: updateNoticeSchemaDTO & {
      imageUrl?: string;
      imagePublicId?: string;
    },
  ): Promise<any>;

  deleteNotice(id: string): Promise<any>;
}