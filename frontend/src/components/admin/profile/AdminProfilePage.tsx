import { UserCircleIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { PageContainer } from "@/components/shared/PageContainer";

import { useAdminProfile } from "@/hooks/useAdminProfile";

import ProfileInfoCard from "@/components/admin/profile/ProfileInfoCard";
import ChangePasswordCard from "@/components/admin/profile/ChangePasswordCard";
import DashboardSkeleton from "@/components/shared/skeletons/DashboardSkeleton";

const AdminProfilePage = () => {
  const { data: profile, isLoading, isError } = useAdminProfile();

  return (
    <PageContainer size="wide" padding="md">
      <div className="py-6 sm:py-8">
        {/* Header */}
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ieit-blue">
            Account
          </p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your profile information and account security.
          </p>
        </div>

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
                <UserCircleIcon className="size-5" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Failed to load profile
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Please refresh the page and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {profile && !isLoading && !isError && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <ProfileInfoCard profile={profile} />

            <ChangePasswordCard />
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default AdminProfilePage;
