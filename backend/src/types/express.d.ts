import { ICurrentUserResponse } from "./index.ts";

declare global {
  namespace Express {
    interface Request {
         user?: ICurrentUserResponse;
    }
  }
}