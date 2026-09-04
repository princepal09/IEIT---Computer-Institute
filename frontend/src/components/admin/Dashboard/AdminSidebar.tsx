import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  BookOpenIcon,
  Building2Icon,
  ContactIcon,
  ImagesIcon,
  LayoutDashboardIcon,
  Loader2Icon,
  LogOutIcon,
  MegaphoneIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { useAdminLogout } from "@/hooks/useAdminAuth";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

const navigation = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Courses",
    href: "/admin/courses",
    icon: BookOpenIcon,
  },
  {
    label: "Branches",
    href: "/admin/branches",
    icon: Building2Icon,
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: UsersIcon,
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    icon: ImagesIcon,
  },
  {
    label: "Notices",
    href: "/admin/notices",
    icon: MegaphoneIcon,
  },
  {
    label: "Contact",
    href: "/admin/contact",
    icon: ContactIcon,
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: SettingsIcon,
  },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ mobileOpen = false, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutMutation = useAdminLogout();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLogoutDialogOpen(false);
        onClose?.();

        toast.success("Logged out successfully");

        navigate("/admin/login", {
          replace: true,
        });
      },

      onError: (error: any) => {
        setLogoutDialogOpen(false);

        toast.error(
          error?.response?.data?.message ??
            "Unable to logout. Please try again."
        );
      },
    });
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-slate-100 px-5">
        <Link to="/admin/dashboard" onClick={onClose} className="min-w-0">
          <p className="truncate font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ieit-blue">
            Institute of Excellence
          </p>

          <p className="mt-0.5 text-lg font-extrabold tracking-tight text-slate-950">
            IEIT Admin
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <p className="mb-3 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Management
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={[
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ieit-blue text-white shadow-sm shadow-ieit-blue/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                ].join(" ")}
              >
                <Icon className="size-4 shrink-0" />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={() => setLogoutDialogOpen(true)}
          disabled={logoutMutation.isPending}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:pointer-events-none disabled:opacity-50"
        >
          {logoutMutation.isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <LogOutIcon className="size-4" />
          )}

          <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
        </button>
      </div>

      {/* Logout Confirmation */}
      <ConfirmationModal
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="Logout from admin portal?"
        description="You will be signed out of your administrator account and redirected to the login page."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        loading={logoutMutation.isPending}
        variant="danger"
      />
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white lg:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
};

export default AdminSidebar;
