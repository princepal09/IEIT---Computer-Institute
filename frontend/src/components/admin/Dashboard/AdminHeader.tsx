import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hook";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const admin = useAppSelector((state) => state.auth.admin);

  const initials =
    admin?.name
      ?.split(" ")
      .map((name) => name.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "AD";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Mobile menu */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="lg:hidden"
      >
        <MenuIcon className="size-5" />
      </Button>

      {/* Right section */}
      <div className="ml-auto">
        <Link
          to="/admin/profile"
          className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-50"
        >
          {/* Name & Email */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-ieit-blue">
              {admin?.name}
            </p>

            <p className="text-xs text-slate-500">
              {admin?.email}
            </p>
          </div>

          {/* Avatar */}
          <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ieit-blue text-xs font-bold text-white ring-2 ring-ieit-blue/10 transition-transform group-hover:scale-105">
            {admin?.profileImageUrl ? (
              <img
                src={admin.profileImageUrl}
                alt={admin.name}
                className="size-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;