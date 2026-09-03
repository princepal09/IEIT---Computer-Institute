import { useQuery } from "@tanstack/react-query";

import { getBranchBySlug } from "@/api/branch.api";

export const useBranch = (slug?: string) => {
  return useQuery({
    queryKey: ["branch", slug],
    queryFn: () => getBranchBySlug(slug as string),
    enabled: Boolean(slug),
  });
};
