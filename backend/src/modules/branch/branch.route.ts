import express from 'express';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from '../auth/auth.container.js';
import { createBranchController } from './branch.controller.js';
import { upload } from '../../middlewares/multer.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createBranchSchema, updateBranchSchema } from './branch.schema.js';

const router = express.Router();

router.post('/create', verifyUser(authService), upload.single('image'), validate(createBranchSchema), createBranchController);

router.patch("/update/:branchId", verifyUser(authService), upload.single("image"), validate(updateBranchSchema) )




export default router;
