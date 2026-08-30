import type { Admin, RefreshToken } from '../../generated/prisma/client.js';
import { ICurrentUserResponse } from '../../types/index.js';

export interface IAuthRepository {
  findAdminByEmail(email: string): Promise<Admin | null>;
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
}
