import { IDashboardRepository } from './dashboard.interface.js';

export class DashboardService {
  constructor(
    private readonly repo: IDashboardRepository,
  ) {}

  async getDashboard() {
    const dashboard = await this.repo.getDashboard();

    return {
      stats: dashboard.stats,

      recentEnquiries: dashboard.recentEnquiries.map(
        (enquiry: any) => ({
          id: enquiry.id,
          name: enquiry.name,
          phone: enquiry.phone,
          email: enquiry.email,
          message: enquiry.message,
          status: enquiry.status,
          createdAt: enquiry.createdAt,

          branch: enquiry.branch
            ? {
                id: enquiry.branch.id,
                name: enquiry.branch.name,
                slug: enquiry.branch.slug,
              }
            : null,

          course: enquiry.course
            ? {
                id: enquiry.course.id,
                name: enquiry.course.name,
                slug: enquiry.course.slug,
              }
            : null,
        }),
      ),

      recentContacts: dashboard.recentContacts.map(
        (contact: any) => ({
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          message: contact.message,
          status: contact.status,
          createdAt: contact.createdAt,
        }),
      ),
    };
  }
}