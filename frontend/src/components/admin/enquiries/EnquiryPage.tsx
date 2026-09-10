import { PageContainer } from "@/components/shared/PageContainer";

import EnquiryTable from "@/components/admin/enquiries/EnquiryTable";

const EnquiryPage = () => {
  return (
    <PageContainer className="py-6 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
          Admin
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Enquiries
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View and manage admission enquiries submitted by students.
        </p>
      </div>

      <EnquiryTable />
    </PageContainer>
  );
};

export default EnquiryPage;
