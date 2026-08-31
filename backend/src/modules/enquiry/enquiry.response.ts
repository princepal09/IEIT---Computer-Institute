import { EnquiryStatus } from "../../generated/prisma/enums.js";

export interface IEnquiryResponse {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  branchId: string;
  courseId: string | null;
  message: string | null;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;

  branch: {
    id: string;
    name: string;
    slug: string;
  } | null;

  course: {
    id: string;
    name: string;
    slug: string;
  } | null;
}