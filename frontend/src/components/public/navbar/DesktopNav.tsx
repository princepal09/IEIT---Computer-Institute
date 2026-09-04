import { Link, NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { BranchesDropdown } from "./BranchesDropdown";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

const DesktopNav = ({ className }: { className?: string }) => {
  return (
    <nav
      aria-label="Main navigation"
      className={cn("hidden items-center lg:flex", className)}
    >
      {/* Navigation links */}
      <div className="flex items-center gap-0.5">
        {navItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "relative rounded-lg px-3 py-2",
                "text-[13px] font-semibold tracking-[-0.01em]",
                "transition-all duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-ieit-blue/30",
                "focus-visible:ring-offset-2",

                isActive
                  ? "text-ieit-blue"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              )
            }
          >
            {({ isActive }) => (
              <>
                {label}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0.5 left-1/2 h-0.5",
                      "w-5 -translate-x-1/2",
                      "rounded-full bg-ieit-blue"
                    )}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Branches */}
        <BranchesDropdown />
      </div>

      {/* Actions */}
      <div className="ml-4 flex items-center gap-2 border-l border-slate-200 pl-4">
       
        <Button
          variant="default"
          size="sm"
          className={cn(
            "h-9 rounded-lg px-4",
            "text-[13px] font-bold",
            "shadow-sm shadow-ieit-blue/20",
            "transition-all duration-200",
            "hover:-translate-y-0.5",
            "hover:shadow-md hover:shadow-ieit-blue/25"
          )}
          render={<Link to="/enquire" />}
        >
          Enroll Now
        </Button>
      </div>
    </nav>
  );
};

export { DesktopNav, navItems };
