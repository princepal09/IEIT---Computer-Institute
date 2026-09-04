import { PageContainer } from "@/components/shared/PageContainer";

const AdminDashboardPage = () => {
  return (
    <PageContainer size="wide" padding="md">
      <div className="py-6 sm:py-8">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ieit-blue">
          Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
          Overview
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your IEIT website, courses, branches, enquiries and
          institute content.
        </p>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Dashboard Overview
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Dashboard statistics and recent activity will appear here.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminDashboardPage;