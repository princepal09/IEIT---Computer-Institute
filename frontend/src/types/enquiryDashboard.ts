export type EnquiryStatus = "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";

export interface AdminEnquiryBranch {
  id: string;
  name: string;
  slug: string;
}

export interface AdminEnquiryCourse {
  id: string;
  name: string;
  slug: string;
}

export interface AdminEnquiry {
  id: string;

  name: string;

  phone: string;

  email?: string | null;

  branchId: string;

  courseId?: string | null;

  message?: string | null;

  status: EnquiryStatus;

  createdAt: string;

  updatedAt: string;

  branch: AdminEnquiryBranch | null;

  course: AdminEnquiryCourse | null;
}

export interface EnquiriesResponse {
  success: boolean;
  message: string;
  data: AdminEnquiry[];
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  data: AdminEnquiry;
}

export interface UpdateEnquiryPayload {
  status: EnquiryStatus;
}
