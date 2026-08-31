import express from 'express';
import { verifyUser } from '../../middlewares/auth.middleware.js';
import { authService } from '../auth/auth.container.js';
import { assignCourseToBranch, createBranchController, deleteBranch, getAllBranches, getBranchByID, getBranchBySlug, getBranchCourses, removeCourseFromBranch, updateBranch } from './branch.controller.js';
import { upload } from '../../middlewares/multer.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createBranchSchema, updateBranchSchema } from './branch.schema.js';

const router = express.Router();

//Admin
router.post("/create", verifyUser(authService), upload.single('image'), validate(createBranchSchema), createBranchController);
router.patch("/update/:branchId", verifyUser(authService),upload.single('image'), validate(updateBranchSchema), updateBranch )
router.delete("/delete/:branchId", verifyUser(authService), deleteBranch);

//PublicRoute
router.get("/all-branches", getAllBranches);
router.get("/slug/:branchSlug", getBranchBySlug);
router.get("/:branchId", getBranchByID);


// BRANCH_ROUTE_RELATIONSHIP

router.post("/:branchId/courses/:courseId", verifyUser(authService), assignCourseToBranch);
router.get("/:branchId/courses", verifyUser(authService), getBranchCourses);
router.delete("/:branchId/courses/:courseId", verifyUser(authService), removeCourseFromBranch);






export default router;
