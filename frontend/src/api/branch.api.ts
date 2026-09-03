import api from "@/lib/axios";
import { BranchResponse } from "@/types/branch";

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

export const getBranches = async (): Promise<Branch[]> => {
  const response = await api.get<BranchesResponse>("/branch/all-branches");
  console.log(response?.data);
  return response?.data?.data;
};

export const getBranchBySlug = async (
  branchSlug: string
): Promise<BranchResponse> => {
  const response = await api.get(`/branch/slug/${branchSlug}`);
  console.log(response.data)
  return response.data;
};
