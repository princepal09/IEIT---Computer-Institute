import AdminHeader from "@/components/admin/Dashboard/AdminHeader";
import AdminSidebar from "@/components/admin/Dashboard/AdminSidebar";
import { useState } from "react";



const AdminDashboardPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main */}
      <div className="lg:pl-64">
        <AdminHeader  
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Page heading */}
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ieit-blue">
                Dashboard
              </p>

              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Overview
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage your IEIT website, courses, branches,
                enquiries and institute content from one place.
              </p>
            </div>

            {/* Dashboard content will come here */}
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Dashboard Overview
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Dashboard statistics and recent activity will
                appear here.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;