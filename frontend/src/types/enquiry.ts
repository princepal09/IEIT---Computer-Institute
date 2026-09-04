export interface EnquiryFormValues {
  name: string;
  phone: string;
  email: string;
  branchId: string;
  courseId: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  data?: unknown;
}
