import { Admin, RefreshToken } from '../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import { IAuthRepository } from './auth.interface.js';
import { ICurrentUserResponse } from '../../types/index.js';
import { IUpdatePasswordResponse } from './auth.response.js';

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
        profileImageUrl: true,
        profileImagePublicId: true,
      },
    });

    return admin;
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return await prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async deleteRefreshToken(id: string): Promise<void> {
    await prisma.refreshToken.delete({
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

  async deleteRefreshTokensByAdminId(adminId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        adminId,
      },
    });
  }

  async updateAdminProfile(
    adminId: string,
    data: { name?: string; profileImageUrl: string; profileImagePublicId?: string },
  ): Promise<ICurrentUserResponse | null> {
    const user = await prisma.admin.update({
      where: {
        id: adminId,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        profileImageUrl: true,
      },
    });

    return user;
  }

  async updatePassword(amdinId: string, currentPasswordHash: string): Promise<void> {
    await prisma.admin.update({
      where: {
        id: amdinId,
      },
      data: {
        passwordHash: currentPasswordHash,
      },
    });
  }

  async findAdminByIdForUpdatePassword(adminId: string): Promise<IUpdatePasswordResponse | null> {
    const user = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: {
        passwordHash: true,
      },
    });

    return user;
  }
}
