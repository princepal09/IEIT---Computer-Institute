import { ICurrentUserResponse } from "../modules/auth/auth.response.ts";

declare global {
  namespace Express {
    interface Request {
         user?: ICurrentUserResponse;
    }
  }
}