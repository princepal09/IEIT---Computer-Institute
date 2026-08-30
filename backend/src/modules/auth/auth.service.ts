import { IPayload } from '../../types/index.js';
import ApiError from '../../utils/AppError.js';
import { comparePassword, compareRefreshToken, hashRefreshToken } from '../../utils/auth.helper.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../utils/jwt.helper.js';
import { IAuthRepository } from './auth.interface.js';
import { ICurrentUserResponse } from '../../types/index.js';
import { loginUserDTO, UpdateProfileDTO } from './auth.schema.js';
import { ILoginResponse } from './auth.response.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../../utils/cloudinary.helper.js';

export class AuthService {
  constructor(private repo: IAuthRepository) {}

  async adminLogin(body: loginUserDTO): Promise<ILoginResponse> {
    const { email, password } = body;

    const admin = await this.repo.findAdminByEmail(email);

    if (!admin) {
      throw new ApiError(401, 'Invalid email or password');
    }

    if (!admin.isActive) {
      throw new ApiError(401, 'Admin account is not active');
    }
    const isPassword = await comparePassword(password, admin.passwordHash);

    if (!isPassword) {
      throw new ApiError(401, 'Invalid email or password');
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

    await this.repo.updateLastLogin(admin.id);

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      accessToken,
      refreshToken,
    };
  }

  async getCurrentUser(adminId: string): Promise<ICurrentUserResponse> {
    const user = await this.repo.findAdminById(adminId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async refreshTokens(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const decoded = verifyRefreshToken(refreshToken);

    if (decoded.type !== 'refresh') {
      throw new ApiError(401, 'Invalid refresh token');
    }

    const tokens = await this.repo.findRefreshTokensByAdminId(decoded.id);

    const matchedToken = await Promise.any(
      tokens.map(async (token) => {
        const matched = compareRefreshToken(refreshToken, token.token);

        if (!matched) {
          throw new Error();
        }

        return token;
      }),
    ).catch(() => null);

    if (!matchedToken) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (matchedToken.expiresAt < new Date()) {
      await this.repo.deleteRefreshToken(matchedToken.id);
      throw new ApiError(401, 'Refresh token expired');
    }

    // Generate new tokens
    const payload = {
      id: decoded.id,
      email: decoded.email,
    };

    const newAccessToken = generateAccessToken({
      ...payload,
      type: 'access',
    });

    const newRefreshToken = generateRefreshToken({
      ...payload,
      type: 'refresh',
    });

    // Delete old refresh token
    console.log('OLD TOKEN ID:', matchedToken.id);

    await this.repo.deleteRefreshToken(matchedToken.id);

    console.log('OLD TOKEN DELETED');

    // Hash and save new refresh token
    const hashedRefreshToken = hashRefreshToken(newRefreshToken);

    await this.repo.saveRefreshToken(
      hashedRefreshToken,
      decoded.id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    const decoded = verifyRefreshToken(refreshToken);
    const tokens = await this.repo.findRefreshTokensByAdminId(decoded.id);

    const matchedToken = tokens.find((token) => compareRefreshToken(refreshToken, token.token));

    if (matchedToken) {
      await this.repo.deleteRefreshToken(matchedToken.id);
    }
  }

  async logoutAll(adminId: string): Promise<void> {
    await this.repo.deleteRefreshTokensByAdminId(adminId);
  }

  async updateProfile(
    adminId: string,
    data: UpdateProfileDTO,
    file?: Express.Multer.File,
  ): Promise<ICurrentUserResponse | null> {
    const admin = await this.repo.findAdminById(adminId);
    if (!admin) {
      throw new ApiError(404, 'Admin not found');
    }
    let profileImageUrl = admin.profileImageUrl as string;
    let profileImagePublicId = admin.profileImagePublicId as string;

    if (file) {
      const uploadedImage = await uploadToCloudinary(file, 'ieit/profiles');
      profileImageUrl = uploadedImage.secure_url;
      profileImagePublicId = uploadedImage.public_id;

      if (admin.profileImagePublicId) {
        await deleteFromCloudinary(admin.profileImagePublicId);
      }
    }

    const updatedAdmin = await this.repo.updateAdminProfile(adminId, {
      ...data,  
      profileImageUrl,
      profileImagePublicId,
    });

    if (!updatedAdmin) {
      throw new ApiError(404, 'Admin not found');
    }

    return updatedAdmin;
  }
}
