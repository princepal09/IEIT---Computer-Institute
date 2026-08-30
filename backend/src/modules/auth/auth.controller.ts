import { Request, Response } from 'express';
import { authService } from './auth.container.js';
import { destroyCookie, setCookies } from '../../utils/auth.helper.js';
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

  if(!req.user){
    throw new ApiError(400, "User not found")
  }

  const { id, email, name, profileImageUrl } = req.user;

  const data = {
    id,
    email,
    name,
    profileImageUrl,
  };

  return res.status(200).json(new ApiResponse(200, data, 'Admin details fetched successfully'));
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

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  destroyCookie(res);

  return res.status(200).json(new ApiResponse(200, null, 'Logout successfully'));
});

export const logoutAllController = asyncHandler(async (req: Request, res: Response) => {
  const adminId = req.user?.id;

  if (!adminId) {
    throw new ApiError(401, 'Not authorized');
  }

  await authService.logoutAll(adminId);

  destroyCookie(res);

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Logged out from all devices successfully'));
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const adminId = req.user?.id;

  if (!adminId) {
    throw new ApiError(401, 'Not authorized');
  }

  const result = await authService.updateProfile(adminId, req.body, req.file);

  return res.status(200).json(new ApiResponse(200, result, 'Profile Updated Successfully'));
});

export const updatePasswordController = asyncHandler(async (req: Request, res: Response) => {
  const adminId = req.user?.id;

  if (!adminId) {
    throw new ApiError(401, 'Not authorized');
  }

  await authService.updatePassword(req.body, adminId);
  destroyCookie(res);

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Passsword Changed Successfully,  Please login again.'));
});
