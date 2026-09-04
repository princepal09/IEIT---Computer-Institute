import AdminHeader from "@/components/admin/Dashboard/AdminHeader";
import AdminSidebar from "@/components/admin/Dashboard/AdminSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Header */}
        <AdminHeader
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;