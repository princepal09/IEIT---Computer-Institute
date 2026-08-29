import express from "express"
import { validate } from "../../middlewares/validate.middleware.js";
import { loginUserSchema } from "./auth.schema.js";
import { loginController } from "./auth.controller.js";

const router = express.Router();


router.post("/login", validate(loginUserSchema), loginController);

export default router;
