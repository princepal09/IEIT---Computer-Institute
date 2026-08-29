import { Admin, RefreshToken } from '../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import { IAuthRepository } from './auth.interface.js';

export class AuthRepository implements IAuthRepository {
  async findAdminByEmail(email: string): Promise<Admin | null> {
    return prisma.admin.findUnique({
      where: { email },
    });
  }
  async saveRefreshToken(token: string, adminId: string, expiresAt: Date): Promise<RefreshToken> {
    return await prisma.refreshToken.create({
      data: {
        token,
        adminId,
        expiresAt,
      },
    });
  }
  async updateLastLogin(adminId: string): Promise<Admin> {
    return prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }
}
