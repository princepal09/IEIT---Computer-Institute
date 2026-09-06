import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppDispatch } from "@/store/hook";

import {
  getAdminProfile,
  updateAdminPassword,
  updateAdminProfile,
} from "@/api/adminProfile";

import { setAdmin } from "@/store/slices/authSlice";

import type {
  UpdatePasswordPayload,
  UpdateProfilePayload,
} from "@/types/adminProfile";

export const adminProfileKeys = {
  all: ["admin-profile"] as const,
};

export const useAdminProfile = () => {
  return useQuery({
    queryKey: adminProfileKeys.all,
    queryFn: getAdminProfile,
  });
};

export const useUpdateAdminProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => updateAdminProfile(data),

    onSuccess: (updatedProfile) => {
      // Update profile query
      queryClient.setQueryData(adminProfileKeys.all, updatedProfile);

      // Update Redux
      dispatch(
        setAdmin({
          id: updatedProfile.id,
          name: updatedProfile.name,
          email: updatedProfile.email,
          profileImageUrl: updatedProfile.profileImageUrl,
        })
      );
    },
  });
};

export const useUpdateAdminPassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordPayload) => updateAdminPassword(data),
  });
};
