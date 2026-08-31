import { Request, Response } from 'express';

import { asyncHandler } from '../../utils/AsyncHandler.js';

import ApiError from '../../utils/AppError.js';

import ApiResponse from '../../utils/ApiResponse.js';
import noticeService from './notice.container.js';


// CREATE
export const createNotice = asyncHandler(
  async (req: Request, res: Response) => {
    const notice = await noticeService.createNotice(
      req.body,
      req.file,
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          notice,
          'Notice created successfully',
        ),
      );
  },
);

// GET ALL - ADMIN
export const getAllNotices = asyncHandler(
  async (_req: Request, res: Response) => {
    const notices = await noticeService.getAllNotices();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          notices,
          'Notices fetched successfully',
        ),
      );
  },
);

// GET PUBLISHED - PUBLIC
export const getPublishedNotices = asyncHandler(
  async (_req: Request, res: Response) => {
    const notices = await noticeService.getPublishedNotices();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          notices,
          'Published notices fetched successfully',
        ),
      );
  },
);

// GET BY ID
export const getNoticeById = asyncHandler(
  async (req: Request, res: Response) => {
    const noticeId = req.params.noticeId as string;

    if (!noticeId) {
      throw new ApiError(400, 'Notice ID is required');
    }

    const notice = await noticeService.getNoticeById(noticeId);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          notice,
          'Notice fetched successfully',
        ),
      );
  },
);

// UPDATE
export const updateNotice = asyncHandler(
  async (req: Request, res: Response) => {
    const noticeId = req.params.noticeId as string;

    if (!noticeId) {
      throw new ApiError(400, 'Notice ID is required');
    }

    const notice = await noticeService.updateNotice(
      noticeId,
      req.body,
      req.file,
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          notice,
          'Notice updated successfully',
        ),
      );
  },
);

// DELETE
export const deleteNotice = asyncHandler(
  async (req: Request, res: Response) => {
    const noticeId = req.params.noticeId as string;

    if (!noticeId) {
      throw new ApiError(400, 'Notice ID is required');
    }

    await noticeService.deleteNotice(noticeId);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          'Notice deleted successfully',
        ),
      );
  },
);