import api from "@/lib/axios";
import { BranchResponse } from "@/types/branch";
import {
  AdminBranch,
  AdminBranchesResponse,
  AdminBranchResponse,
} from "@/types/branchDashboard";
export interface Branch {
  id: string;
  name: string;
  slug: string;
  location: string;
  address: string;
}

export interface BranchesResponse {
  data: Branch[];
}

export interface CreateBranchPayload {
  name: string;
  description?: string;
  address: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  mapUrl?: string;
  openingTime?: string;
  closingTime?: string;
  isActive?: boolean;
  image?: File;
}

export interface UpdateBranchPayload {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  mapUrl?: string;
  openingTime?: string;
  closingTime?: string;
  isActive?: boolean;
  image?: File;
}

export const getBranches = async (): Promise<Branch[]> => {
  const response = await api.get<BranchesResponse>("/branch/all-branches");
  return response?.data?.data;
};
("");
export const getAdminBranches = async (): Promise<AdminBranch[]> => {
  const response = await api.get<AdminBranchesResponse>("/branch/all-branches");
  return response?.data?.data;
};

export const getBranchBySlug = async (
  branchSlug: string
): Promise<BranchResponse> => {
  const response = await api.get(`/branch/slug/${branchSlug}`);
  return response.data;
};

/*
 * GET ALL BRANCHES
 */

export const getAdminBranchById = async (
  branchId: string
): Promise<AdminBranch> => {
  const response = await api.get<AdminBranchResponse>(`/branch/${branchId}`);

  return response.data.data;
};

/*
 * CREATE BRANCH
 */
export const createBranchFormData = (
  data: CreateBranchPayload | UpdateBranchPayload
) => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.description !== undefined) {
    formData.append("description", data.description);
  }

  if (data.address !== undefined) {
    formData.append("address", data.address);
  }

  if (data.phone !== undefined) {
    formData.append("phone", data.phone);
  }

  if (data.email !== undefined) {
    formData.append("email", data.email);
  }

  if (data.whatsapp !== undefined) {
    formData.append("whatsapp", data.whatsapp);
  }

  if (data.mapUrl !== undefined) {
    formData.append("mapUrl", data.mapUrl);
  }

  if (data.openingTime !== undefined) {
    formData.append("openingTime", data.openingTime);
  }

  if (data.closingTime !== undefined) {
    formData.append("closingTime", data.closingTime);
  }

  if (data.isActive !== undefined) {
    formData.append("isActive", String(data.isActive));
  }

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  return formData;
};

/**
 * CREATE BRANCH
 */
export const createAdminBranch = async (
  data: CreateBranchPayload
): Promise<AdminBranch> => {
  const formData = createBranchFormData(data);

  const response = await api.post<AdminBranchResponse>(
    "/branch/create",
    formData
  );

  return response.data.data;
};

/**
 * UPDATE BRANCH
 */
export const updateAdminBranch = async (
  branchId: string,
  data: UpdateBranchPayload
): Promise<AdminBranch> => {
  const formData = createBranchFormData(data);

  const response = await api.patch<AdminBranchResponse>(
    `/branch/update/${branchId}`,
    formData
  );

  return response.data.data;
};
/*
 * DELETE BRANCH
 */
export const deleteAdminBranch = async (
  branchId: string
): Promise<AdminBranch> => {
  const response = await api.delete<AdminBranchResponse>(
    `/branch/delete/${branchId}`
  );

  return response.data.data;
};
