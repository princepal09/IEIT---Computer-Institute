export interface EnquiryEmailData {
  name: string;
  phone: string;
  email: string | null;
  message: string | null;

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