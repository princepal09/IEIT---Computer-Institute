import { BellIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { PageContainer } from "@/components/shared/PageContainer";

import { useDashboard } from "@/hooks/useDashboard";
import DashboardHeader from "@/components/admin/Dashboard/DashboardHeader";
import DashboardSkeleton from "@/components/shared/skeletons/DashboardSkeleton";
import DashboardStats from "@/components/admin/Dashboard/DashboardStats";
import DashboardSummary from "@/components/admin/Dashboard/DashboardSummary";
import RecentEnquiries from "@/components/admin/Dashboard/RecentEnquiries";
import RecentContacts from "@/components/admin/Dashboard/RecentContacts";

const AdminDashboardPage = () => {
  const { data, isLoading, isError } = useDashboard();

  return (
    <PageContainer size="wide" padding="md">
      <div className="py-6 sm:py-8">
        {/* Header */}
        <DashboardHeader />

        {/* Loading */}
        {isLoading && (
          <div className="mt-8">
            <DashboardSkeleton />
          </div>
        )}

        {/* Error */}
        {isError && (
          <Card className="mt-8 rounded-2xl border-red-100 bg-white shadow-sm">
            <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
              <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <BellIcon className="size-5" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Failed to load dashboard
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Please refresh the page and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Dashboard content */}
        {data && !isLoading && !isError && (
          <div className="mt-8 space-y-8">
            {/* Main statistics */}
            <DashboardStats stats={data.stats} />

            {/* Small summary */}
            <DashboardSummary stats={data.stats} />

            {/* Recent activity */}
            <div className="grid gap-6 xl:grid-cols-2">
              <RecentEnquiries enquiries={data.recentEnquiries} />

              <RecentContacts contacts={data.recentContacts} />
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default AdminDashboardPage;
