import api from "@/lib/axios";
import { Admin, LoginRequest, LoginResponse } from "@/types/admin";

export const loginAdmin = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/admin/login", data);
  return response.data;
};

export const getCurrentAdmin = async (): Promise<Admin> => {
  const response = await api.get("/auth/admin/me");
  return response.data.data;
};

export const logoutAdmin = async () => {
  const response = await api.post("/auth/admin/logout");
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await api.post("/auth/admin/forgot-password", data);

  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  const response = await api.post("/auth/admin/reset-password", data);

  return response.data;
};
