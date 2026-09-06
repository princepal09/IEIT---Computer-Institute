export type EnquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "CONVERTED"
  | "CLOSED";

export type ContactStatus = "UNREAD" | "READ";

export interface DashboardEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: EnquiryStatus;
  createdAt: string;

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

export interface DashboardContact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface DashboardStats {
  branches: {
    total: number;
    active: number;
    inactive: number;
  };

  courses: {
    total: number;
    active: number;
    inactive: number;
  };

  enquiries: {
    total: number;
    new: number;
    contacted: number;
    converted: number;
    closed: number;
  };

  contactMessages: {
    total: number;
    unread: number;
    read: number;
  };

  galleryImages: number;

  notices: {
    total: number;
    published: number;
    unpublished: number;
  };
}

export interface DashboardData {
  stats: DashboardStats;
  recentEnquiries: DashboardEnquiry[];
  recentContacts: DashboardContact[];
}