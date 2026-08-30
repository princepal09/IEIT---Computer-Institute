import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import ApiError from '../utils/AppError.js';

const errorMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Image size must not exceed 5 MB',
        errors: [],
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
      errors: [],
    });
  }

  // Your ApiError
  const statusCode =
    err instanceof ApiError ? err.status : 500;

  const message =
    err instanceof ApiError
      ? err.message
      : 'Internal Server Error';

  const errors =
    err instanceof ApiError ? err.errors : [];

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack:
      process.env.NODE_ENV === 'development'
        ? err.stack
        : undefined,
  });
};

export default errorMiddleware;