import express from 'express';
import { authService } from '../auth/auth.container.js';
import { createGallery, deleteGallery, getAllGallery } from './gallery.controller.js';
import { upload } from '../../middlewares/multer.middleware.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Upload multiple gallery images
router.post('/create', verifyUser(authService), upload.array('images', 5), createGallery);

// Get all gallery images
router.get('/all', verifyUser(authService), getAllGallery);

// // Update gallery image
// router.patch(
//   '/update/:galleryId',
//   verifyUser(authService),
//   validate(updateGallerySchema),
//   updateGallery,
// );

// Delete gallery image
router.delete('/delete/:galleryId', verifyUser(authService), deleteGallery);



export default router;
