export interface CourseBranch {
  id: string;
  branch: {
    id: string;
    name: string;
  };
}

export interface AdminCourse {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  duration: string;
  eligibility: string;
  fee: number | string;
  originalFee?: number | null;
  discountPercent?: number | null;
  category: string;
  branches?: CourseBranch[];
  branchIds?: string[];
}
