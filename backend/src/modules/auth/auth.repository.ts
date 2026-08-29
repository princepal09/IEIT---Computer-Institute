import { Admin, RefreshToken } from '../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import { IAuthRepository } from './auth.interface.js';
import { ICurrentUserResponse } from '../../types/index.js';

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

  async findAdminById(adminId: string): Promise<ICurrentUserResponse | null> {
    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return admin;
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return await prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async deleteRefreshToken(id: string): Promise<RefreshToken> {
    return await prisma.refreshToken.delete({
      where: { id },
    });
  }

  async findRefreshTokensByAdminId(adminId: string): Promise<RefreshToken[]> {
    return await prisma.refreshToken.findMany({
      where: { adminId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
