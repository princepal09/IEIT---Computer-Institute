import { IPayload } from '../../types/index.js';
import ApiError from '../../utils/AppError.js';
import { comparePassword, hashRefreshToken } from '../../utils/auth.helper.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.helper.js';
import { IAuthRepository } from './auth.interface.js';
import { ILoginResponse } from './auth.response.js';
import { loginUserDTO } from './auth.schema.js';

export class AuthService {
  constructor(private repo: IAuthRepository) {}

  async adminLogin(body: loginUserDTO): Promise<ILoginResponse> {
    const { email, password } = body;

    const admin = await this.repo.findAdminByEmail(email);

    if (!admin) {
      throw new ApiError(401, 'Invail email, Unauthorized');
    }

    if (!admin.isActive) {
      throw new ApiError(401, 'Admin account is not active');
    }
    const isPassword = await comparePassword(password, admin.passwordHash);

    if (!isPassword) {
      throw new ApiError(401, 'Invail password');
    }

    const payloadAccess: IPayload = {
      id: admin.id,
      email: admin.email,
      type: 'access',
    };
    const payloadRefresh: IPayload = {
      id: admin.id,
      email: admin.email,
      type: 'refresh',
    };

    const accessToken = generateAccessToken(payloadAccess);
    if (!accessToken) {
      throw new ApiError(500, 'Failed to generate access token');
    }

    const refreshToken = generateRefreshToken(payloadRefresh);
    if (!refreshToken) {
      throw new ApiError(500, 'Failed to generate refresh token');
    }

    const hashRefresh = await hashRefreshToken(refreshToken);

    if (!hashRefresh) {
      throw new ApiError(500, 'Failed to hash the refresh token');
    }

    await this.repo.saveRefreshToken(
      hashRefresh,
      admin.id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      accessToken,
      refreshToken
    };
  }
}
