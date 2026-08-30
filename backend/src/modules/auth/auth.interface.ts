import type { Admin, RefreshToken } from '../../generated/prisma/client.js';
import { ICurrentUserResponse } from '../../types/index.js';
import { IUpdatePasswordResponse } from './auth.response.js';

export interface IAuthRepository {
  findAdminByEmail(email: string): Promise<any>;
  saveRefreshToken(token: string, adminId: string, expiresAt: Date): Promise<RefreshToken>;
  updateLastLogin(adminId: string): Promise<Admin>;
  findAdminById(adminId: string): Promise<ICurrentUserResponse | null>;
  findRefreshToken(token: string): Promise<RefreshToken | null>;
  deleteRefreshToken(id: string): Promise<void>;
  findRefreshTokensByAdminId(adminId: string): Promise<RefreshToken[]>;
  deleteRefreshTokensByAdminId(adminId: string): Promise<void>;
  updateAdminProfile(
    adminId: string,
    data: {
      name?: string;
      profileImageUrl: string;
      profileImagePublicId?: string;
    },
  ): Promise<ICurrentUserResponse | null>;
  updatePassword(amdinId: string, currentPasswordHash: string): Promise<void>;
  findAdminByIdForUpdatePassword(adminId: string): Promise<IUpdatePasswordResponse | null>;

  createPasswordResetToken(adminId: string, tokenHash: string, expiresAt: Date): Promise<any>;
  findPasswordResetToken(tokenHash: string): Promise<any>;
  deletePasswordResetToken(tokenId: string): Promise<void>;
  deletePasswordResetTokensByAdminId(adminId: string): Promise<void>;

  resetPasswordTransaction(
    adminId: string,
    passwordHash: string,
    resetTokenId: string,
  ): Promise<void>;
}
