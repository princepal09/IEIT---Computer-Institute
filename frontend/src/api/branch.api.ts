import api from "@/lib/axios";

export interface Branch {
  id: string;
  name: string;
  slug: string;
  location: string;
  address: string;
}

 export interface BranchResponse {
  data: Branch[];
}

export const getBranches = async (): Promise<Branch[]> => {
  const response = await api.get<BranchResponse>("/branch/all-branches");
  console.log(response?.data);
  return response?.data?.data
};
