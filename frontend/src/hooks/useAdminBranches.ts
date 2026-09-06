import { getBranches } from "@/api/branch.api";
import { useQuery } from "@tanstack/react-query";

export const adminBranchKeys = {
  all: ["admin-branches"] as const,
};

export const useAdminBranches = () => {
  return useQuery({
    queryKey: adminBranchKeys.all,
    queryFn: getBranches,
  });
};