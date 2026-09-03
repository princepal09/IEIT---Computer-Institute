export interface Branch {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  mapUrl: string;
  openingTime: string;
  closingTime: string;
  imageUrl: string;
  isActive: boolean;
}

export interface BranchResponse {
  data: Branch;
  message: string;
  success: boolean;
}