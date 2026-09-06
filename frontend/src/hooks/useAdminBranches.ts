import { createAdminBranch, CreateBranchPayload, deleteAdminBranch, getAdminBranchById, getAdminBranches, getBranches, updateAdminBranch, UpdateBranchPayload } from "@/api/branch.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const adminBranchKeys = {
  all: ["admin-branches"] as const,

  detail: (branchId: string) =>
    ["admin-branches", branchId] as const,
};


// GET ALL
export const useAdminBranches = () => {
  return useQuery({
    queryKey: adminBranchKeys.all,
    queryFn: getAdminBranches,
  });
};

/*
 * GET SINGLE
 */
export const useAdminBranch = (
  branchId: string
) => {
  return useQuery({
    queryKey: adminBranchKeys.detail(branchId),

    queryFn: () =>
      getAdminBranchById(branchId),

    enabled: Boolean(branchId),
  });
};



/*
 * CREATE
 */
export const useCreateAdminBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateBranchPayload
    ) => createAdminBranch(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminBranchKeys.all,
      });
    },
  });
};


/*
 * UPDATE
 */
export const useUpdateAdminBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      branchId,
      data,
    }: {
      branchId: string;
      data: UpdateBranchPayload;
    }) =>
      updateAdminBranch(
        branchId,
        data
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminBranchKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: adminBranchKeys.detail(
          variables.branchId
        ),
      });
    },
  });
};


/*
 * DELETE
 */
export const useDeleteAdminBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      branchId: string
    ) =>
      deleteAdminBranch(branchId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminBranchKeys.all,
      });
    },
  });
};