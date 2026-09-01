import { Request, Response } from 'express';

import { asyncHandler } from '../../utils/AsyncHandler.js';

import ApiError from '../../utils/AppError.js';

import ApiResponse from '../../utils/ApiResponse.js';

import galleryService from './gallery.container.js';

export const createGallery = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    throw new ApiError(400, 'At least one image is required');
  }

   await galleryService.createGallery(files);

  return res
    .status(201)
    .json(new ApiResponse(201, null, 'Gallery images uploaded successfully'));
});

export const getAllGallery = asyncHandler(async (_req: Request, res: Response) => {
  const gallery = await galleryService.getAllGallery();

  return res.status(200).json(new ApiResponse(200, gallery, 'Gallery fetched successfully'));
});


export const getGalleryById = asyncHandler(async (req: Request, res: Response) => {
  const galleryId = req.params.galleryId as string;

  if (!galleryId) {
    throw new ApiError(400, 'Gallery ID is required');
  }

  const gallery = await galleryService.getGalleryById(galleryId);

  return res.status(200).json(new ApiResponse(200, gallery, 'Gallery image fetched successfully'));
});

// export const updateGallery =
//   asyncHandler(
//     async (
//       req: Request,
//       res: Response,
//     ) => {

//       const galleryId =
//         req.params.galleryId as string;

//       if (!galleryId) {

//         throw new ApiError(
//           400,
//           'Gallery ID is required',
//         );
//       }

//       const gallery =
//         await galleryService.updateGallery(
//           galleryId,
//           req.body,
//         );

//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             gallery,
//             'Gallery updated successfully',
//           ),
//         );
//     },
//   );

// ==========================================
// DELETE GALLERY
// ==========================================

export const deleteGallery = asyncHandler(async (req: Request, res: Response) => {
  const galleryId = req.params.galleryId as string;

  if (!galleryId) {
    throw new ApiError(400, 'Gallery ID is required');
  }

  await galleryService.deleteGallery(galleryId);

  return res.status(200).json(new ApiResponse(200, null, 'Gallery image deleted successfully'));
});
