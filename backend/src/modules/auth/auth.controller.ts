import { Request, Response } from 'express';
import { authService } from './auth.container.js';
import { setCookies } from '../../utils/auth.helper.js';
import ApiResponse from '../../utils/ApiResponse.js';

export const loginController = async (req: Request, res: Response) => {
  const result = await authService.adminLogin(req.body);

  setCookies(res, result?.accessToken, result?.refreshToken);

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
};
