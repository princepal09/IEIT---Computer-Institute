import { useQuery } from "@tanstack/react-query";

import { getBranches } from "@/api/branch.api";

export const useBranches = () => {
  return useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });
};

