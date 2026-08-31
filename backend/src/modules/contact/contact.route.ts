import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { createContactMessageSchema, updateContactMessageSchema } from './contact.schema.js';
import {
  createContactMessage,
  deleteContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
} from './contact.controller.js';
import { authService } from '../auth/auth.container.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// PUBLIC ROUTE

router.post('/create', validate(createContactMessageSchema), createContactMessage);

// ADMIN ROUTES

router.get('/all', verifyUser(authService), getAllContactMessages);

router.get('/:contactMessageId', verifyUser(authService), getContactMessageById);

router.patch(
  '/update/:contactMessageId',
  verifyUser(authService),
  validate(updateContactMessageSchema),
  updateContactMessage,
);

router.delete('/delete/:contactMessageId', verifyUser(authService), deleteContactMessage);

export default router;
