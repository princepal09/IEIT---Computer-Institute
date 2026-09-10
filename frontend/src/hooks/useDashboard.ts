import { getDashboard } from "@/api/dashboard.api";
import { useQuery } from "@tanstack/react-query";

export const dashboardKeys = {
  all: ["admin-dashboard"] as const,
};

export const useDashboard = () => {
  return useQuery({
    queryKey: dashboardKeys.all,
    queryFn: getDashboard,
  });
};
