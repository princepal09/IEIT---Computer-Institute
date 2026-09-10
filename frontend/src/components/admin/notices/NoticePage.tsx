import { PageContainer } from "@/components/shared/PageContainer";

import NoticeGrid from "@/components/admin/notices/NoticeGrid";

const NoticePage = () => {
  return (
    <PageContainer className="py-6 sm:py-8">
      {/* Page Header */}
      <div className="mb-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
          Admin
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Notices
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create and manage announcements displayed on the institute website.
        </p>
      </div>

      <NoticeGrid />
    </PageContainer>
  );
};

export default NoticePage;
