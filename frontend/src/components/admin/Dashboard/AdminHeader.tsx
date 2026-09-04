import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hook";

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
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-900">
            {admin?.name}
          </p>

          <p className="text-xs text-slate-500">
            {admin?.email}
          </p>
        </div>

        {/* Avatar */}
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ieit-blue text-xs font-bold text-white ring-2 ring-ieit-blue/10">
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
      </div>
    </header>
  );
};

export default AdminHeader;