export interface CourseBranch {
  id: string;
  name: string;
  slug: string;
}

export interface CoursesResponse {
  success: boolean;
  message: string;
  data: Course[];
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  duration: string;
  eligibility: string;
  originalFee: number | string;
  discountPercent: number | string;
  fee: number | string;
  category: string;
  branches?: CourseBranch[];
  branchIds?: string[];
}

export interface CourseResponse {
  data: Course;
  message: string;
  success: boolean;
}
