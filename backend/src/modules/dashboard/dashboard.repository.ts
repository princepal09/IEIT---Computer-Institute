import { prisma } from '../../lib/prisma.js';
import { IDashboardRepository } from './dashboard.interface.js';

export class DashboardRepository implements IDashboardRepository {
  async getDashboard() {
    const [
      totalBranches,
      activeBranches,

      totalCourses,
      activeCourses,

      totalEnquiries,
      newEnquiries,
      contactedEnquiries,
      convertedEnquiries,
      closedEnquiries,

      totalContacts,
      unreadContacts,

      galleryImages,

      totalNotices,
      publishedNotices,

      recentEnquiries,

      recentContacts,
    ] = await Promise.all([
      // Branches
      prisma.branch.count(),

      prisma.branch.count({
        where: {
          isActive: true,
        },
      }),

      // Courses
      prisma.course.count(),

      prisma.course.count({
        where: {
          isActive: true,
        },
      }),

      // Enquiries
      prisma.enquiry.count(),

      prisma.enquiry.count({
        where: {
          status: 'NEW',
        },
      }),

      prisma.enquiry.count({
        where: {
          status: 'CONTACTED',
        },
      }),

      prisma.enquiry.count({
        where: {
          status: 'CONVERTED',
        },
      }),

      prisma.enquiry.count({
        where: {
          status: 'CLOSED',
        },
      }),

      // Contacts
      prisma.contactMessage.count(),

      prisma.contactMessage.count({
        where: {
          status: 'UNREAD',
        },
      }),

      // Gallery
      prisma.gallery.count(),

      // Notices
      prisma.notice.count(),

      prisma.notice.count({
        where: {
          isPublished: true,
        },
      }),

      // Recent enquiries
      prisma.enquiry.findMany({
        take: 5,

        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          message: true,
          status: true,
          createdAt: true,

          branch: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },

          course: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),

      // Recent contacts
      prisma.contactMessage.findMany({
        take: 5,

        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      stats: {
        branches: {
          total: totalBranches,
          active: activeBranches,
          inactive: totalBranches - activeBranches,
        },

        courses: {
          total: totalCourses,
          active: activeCourses,
          inactive: totalCourses - activeCourses,
        },

        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
          contacted: contactedEnquiries,
          converted: convertedEnquiries,
          closed: closedEnquiries,
        },

        contactMessages: {
          total: totalContacts,
          unread: unreadContacts,
          read: totalContacts - unreadContacts,
        },

        galleryImages,

        notices: {
          total: totalNotices,
          published: publishedNotices,
          unpublished: totalNotices - publishedNotices,
        },
      },

      recentEnquiries,

      recentContacts,
    };
  }
}