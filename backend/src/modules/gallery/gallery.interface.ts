
export interface IGalleryRepository {

  createManyGallery(
    data: CreateGalleryData[],
  ): Promise<void>;

  findAllGallery(): Promise<any[]>;

  findGalleryById(
    id: string,
  ): Promise<any | null>;

//   updateGallery(
//     id: string,
//     data: updateGallerySchemaDTO,
//   ): Promise<any>;

  deleteGallery(
    id: string,
  ): Promise<any>;
}


export interface CreateGalleryData {
  imageUrl: string;
  imagePublicId?: string;
  displayOrder: number;
}

// export interface UpdateGalleryData {
//   displayOrder?: number;
//   isPublished?: boolean;
// }