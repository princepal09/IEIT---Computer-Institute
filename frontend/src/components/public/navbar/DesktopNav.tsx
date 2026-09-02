import { Link, NavLink } from "react-router-dom";
import { LogInIcon } from "lucide-react";
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
      className={cn("hidden items-center gap-1 lg:flex", className)}
    >
      {navItems.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "relative px-3 py-2 text-[0.8125rem] font-medium transition-colors rounded-md",
              "hover:text-foreground hover:bg-muted/60",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive ? "text-foreground" : "text-muted-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              {label}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-ieit-blue"
                />
              )}
            </>
          )}
        </NavLink>
      ))}

      <BranchesDropdown />

      <div className="ml-2 flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-[0.8125rem] font-medium text-muted-foreground"
          render={<Link to="/login" />}
        >
          <LogInIcon className="size-3.5" />
          Login
        </Button>

        <Button
          variant="default"
          size="sm"
          className="h-8 px-4 text-[0.8125rem] font-semibold"
          render={<Link to="/enquire" />}
        >
          Enroll Now
        </Button>
      </div>
    </nav>
  );
};

export { DesktopNav, navItems };
