import type { Admin, RefreshToken } from "../../generated/prisma/client.js";

export interface IAuthRepository {
   findAdminByEmail(email : string): Promise<Admin | null>;
   saveRefreshToken(token: string, adminId : string, expiresAt : Date) : Promise<RefreshToken>;
   updateLastLogin(adminId: string): Promise<Admin>;
}
