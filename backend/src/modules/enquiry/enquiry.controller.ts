import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/AppError.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import enquiryService from './enquiry.container.js';
import { Request, Response } from 'express';

export const createEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await enquiryService.createEnquiry(req.body);

  return res.status(201).json(new ApiResponse(201, enquiry, 'Enquiry submitted successfully'));
});

export const getAllEnquiries = asyncHandler(async (_req: Request, res: Response) => {
  const enquiries = await enquiryService.getAllEnquries();

  return res.status(200).json(new ApiResponse(200, enquiries, 'Enquiries fetched successfully'));
});

export const getEnquiryById = asyncHandler(async (req: Request, res: Response) => {
  const enquiryId = req.params.enquiryId as string;
  if (!enquiryId) {
    throw new ApiError(400, 'Enquiry ID is required');
  }

  const enquiry = await enquiryService.getEnquiryById(enquiryId);

  return res.status(200).json(new ApiResponse(200, enquiry, 'Enquiry fetched successfully'));
});

export const updateEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiryId = req.params.enquiryId as string;
  if (!enquiryId) {
    throw new ApiError(400, 'Enquiry ID is required');
  }

  const enquiry = await enquiryService.updateEnquiry(enquiryId, req.body);

  return res.status(200).json(new ApiResponse(200, enquiry, 'Enquiry updated successfully'));
});

export const deleteEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiryId = req.params.enquiryId as string;
  if (!enquiryId) {
    throw new ApiError(400, 'Enquiry ID is required');
  }

  await enquiryService.deleteEnquiry(enquiryId);

  return res.status(200).json(new ApiResponse(200, null, 'Enquiry deleted successfully'));
});


