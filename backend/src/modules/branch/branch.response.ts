export interface IBranchResponse {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  mapUrl: string | null;
  openingTime: string | null;
  closingTime: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
