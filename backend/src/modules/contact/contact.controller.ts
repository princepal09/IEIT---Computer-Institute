import { Request, Response } from 'express';

import { asyncHandler } from '../../utils/AsyncHandler.js';

import ApiError from '../../utils/AppError.js';

import ApiResponse from '../../utils/ApiResponse.js';

import contactService from './contact.container.js';

// CREATE CONTACT MESSAGE
export const createContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const contactMessage = await contactService.createContactMessage(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, contactMessage, 'Contact message sent successfully'));
});

// GET ALL CONTACT MESSAGES
export const getAllContactMessages = asyncHandler(async (_req: Request, res: Response) => {
  const messages = await contactService.getAllContactMessages();

  return res
    .status(200)
    .json(new ApiResponse(200, messages, 'Contact messages fetched successfully'));
});

// GET CONTACT MESSAGE BY ID
export const getContactMessageById = asyncHandler(async (req: Request, res: Response) => {
  const contactMessageId = req.params.contactMessageId as string;

  if (!contactMessageId) {
    throw new ApiError(400, 'Contact message ID is required');
  }

  const message = await contactService.getContactMessageById(contactMessageId);

  return res
    .status(200)
    .json(new ApiResponse(200, message, 'Contact message fetched successfully'));
});

// UPDATE CONTACT MESSAGE
export const updateContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const contactMessageId = req.params.contactMessageId as string;

  if (!contactMessageId) {
    throw new ApiError(400, 'Contact message ID is required');
  }

  const message = await contactService.updateContactMessage(contactMessageId, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, message, 'Contact message updated successfully'));
});

// DELETE CONTACT MESSAGE
export const deleteContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const contactMessageId = req.params.contactMessageId as string;

  if (!contactMessageId) {
    throw new ApiError(400, 'Contact message ID is required');
  }

  await contactService.deleteContactMessage(contactMessageId);

  return res.status(200).json(new ApiResponse(200, null, 'Contact message deleted successfully'));
});
