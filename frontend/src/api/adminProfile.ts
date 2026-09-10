import api from "@/lib/axios";

import type {
  AdminProfile,
  AdminProfileResponse,
  BasicResponse,
  UpdatePasswordPayload,
  UpdateProfilePayload,
} from "@/types/adminProfile";

export const getAdminProfile = async (): Promise<AdminProfile> => {
  const response = await api.get<AdminProfileResponse>("/auth/admin/me");

  return response.data.data;
};

const createProfileFormData = (data: UpdateProfilePayload) => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.profileImage instanceof File) {
    formData.append("profileImage", data.profileImage);
  }

  return formData;
};

export const updateAdminProfile = async (
  data: UpdateProfilePayload
): Promise<AdminProfile> => {
  const formData = createProfileFormData(data);

  const response = await api.patch<AdminProfileResponse>(
    "/auth/admin/update-profile",
    formData
  );

  return response.data.data;
};

export const updateAdminPassword = async (
  data: UpdatePasswordPayload
): Promise<void> => {
  await api.patch<BasicResponse>("/auth/admin/change-password", data);
};
