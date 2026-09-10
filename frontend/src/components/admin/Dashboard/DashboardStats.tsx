import {
  BellIcon,
  BookOpenIcon,
  Building2Icon,
  FileImageIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";

import DashboardStatCard from "./DashboardStatCard";

import { DashboardStats } from "@/types/adminDashboard";

interface DashboardStatsProps {
  stats: DashboardStats;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <DashboardStatCard
        label="Branches"
        value={stats.branches.total}
        description={`${stats.branches.active} active branches`}
        icon={Building2Icon}
        href="/admin/branches"
      />

      <DashboardStatCard
        label="Courses"
        value={stats.courses.total}
        description={`${stats.courses.active} active courses`}
        icon={BookOpenIcon}
        href="/admin/courses"
      />

      <DashboardStatCard
        label="Enquiries"
        value={stats.enquiries.total}
        description={`${stats.enquiries.new} new enquiries`}
        icon={UsersIcon}
        href="/admin/enquiries"
      />

      <DashboardStatCard
        label="Contact Messages"
        value={stats.contactMessages.total}
        description={`${stats.contactMessages.unread} unread messages`}
        icon={MessageSquareIcon}
        href="/admin/contact"
      />

      <DashboardStatCard
        label="Gallery Images"
        value={stats.galleryImages}
        description="Images in your gallery"
        icon={FileImageIcon}
        href="/admin/gallery"
      />

      <DashboardStatCard
        label="Notices"
        value={stats.notices.total}
        description={`${stats.notices.published} published notices`}
        icon={BellIcon}
        href="/admin/notices"
      />
    </div>
  );
};

export default DashboardStats;
