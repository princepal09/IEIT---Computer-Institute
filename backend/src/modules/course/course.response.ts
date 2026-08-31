export interface ICourseResponse {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  duration: string | null;
  eligibility: string | null;
  fee: string | null;
  category: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}