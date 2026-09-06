export interface AdminBranchCourse {
  id: string;
  name: string;
  slug: string;
}

export interface AdminBranch {
  id: string;
  name: string;
  slug: string;

  description?: string | null;
  address: string;

  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;

  mapUrl?: string | null;

  openingTime?: string | null;
  closingTime?: string | null;

  imageUrl?: string | null;

  isActive: boolean;

  courses: AdminBranchCourse[];

  createdAt: string;
  updatedAt: string;
}

export interface AdminBranchesResponse {
  success: boolean;
  message: string;
  data: AdminBranch[];
}

export interface AdminBranchResponse {
  success: boolean;
  message: string;
  data: AdminBranch;
}
