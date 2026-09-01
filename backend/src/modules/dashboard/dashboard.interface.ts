export interface IDashboardRepository {
  getDashboard(): Promise<any>;
}

export interface DashboardData {
  stats: {
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
  };

  recentEnquiries: {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    message: string | null;
    status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'CLOSED';
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
  }[];

  recentContacts: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: 'UNREAD' | 'READ';
    createdAt: string;
  }[];
}
