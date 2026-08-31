import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { createEnquirySchema, updateEnquirySchema } from './enquiry.schema.js';
import {
  createEnquiry,
  deleteEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
} from './enquiry.controller.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from '../auth/auth.container.js';

const router = express.Router();

//Create
router.post('/create', validate(createEnquirySchema), createEnquiry);

//ADMIN
router.get('/all', verifyUser(authService), getAllEnquiries);

router.get('/:enquiryId', verifyUser(authService), getEnquiryById);

router.patch(
  '/update/:enquiryId',
  verifyUser(authService),
  validate(updateEnquirySchema),
  updateEnquiry,
);

router.delete('/delete/:enquiryId', verifyUser(authService), deleteEnquiry);

export default router;
