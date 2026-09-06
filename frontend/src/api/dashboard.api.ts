import api from "@/lib/axios";
import { DashboardData } from "@/types/adminDashboard";

interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get<DashboardResponse>("/dashboard");

  return response.data.data;
};