import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/AppError.js';
import { verifyAccessToken } from '../utils/jwt.helper.js';
import { AuthService } from '../modules/auth/auth.service.js';

export const verifyUser = (authService: AuthService) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ', '');

      console.log(token);

      if (!token) {
        throw new ApiError(401, 'Unauthorized request');
      }

      const decoded = verifyAccessToken(token);
      
      if (decoded.type !== 'access') {
        throw new ApiError(401, 'Invalid access token');
      }

      const user = await authService.getCurrentUser(decoded.id);

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};
