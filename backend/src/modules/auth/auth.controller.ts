import { Request, Response } from 'express';
import { authService } from './auth.container.js';
import { setCookies } from '../../utils/auth.helper.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/AppError.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.adminLogin(req.body);

  setCookies(res, result.accessToken, result.refreshToken);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: result.id,
        name: result.name,
        email: result.email,
      },
      'Login successfully',
    ),
  );
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const adminId = req.user?.id;

  if (!adminId) {
    throw new ApiError(401, 'Not authorized');
  }

  return res.status(200).json(new ApiResponse(200, req.user, 'Admin details fetched successfully'));
});

export const refreshTokenController = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token not found');
  }

  const result = await authService.refreshTokens(refreshToken);

  setCookies(res, result.accessToken, result.refreshToken);
  return res.status(200).json(new ApiResponse(200, null, 'Tokens refreshed successfully'));
});
