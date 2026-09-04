import { Navigate, Outlet } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

import { useCurrentAdmin } from "@/hooks/useAdminAuth";

const ProtectedAdminRoute = () => {
  const { data: admin, isLoading, isError } = useCurrentAdmin();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2Icon className="size-6 animate-spin text-ieit-blue" />
      </div>
    );
  }

  if (isError || !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;