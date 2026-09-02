import api from "@/lib/axios";

export interface Branch {
  id: string;
  name: string;
  slug: string;
  location: string;
  address: string;
}

export const getBranches = async (): Promise<Branch[]> => {
  const response = await api.get<Branch[]>("/branches");
  console.log(response?.data);
  return response.data;
};
