import { Link, NavLink } from "react-router-dom";
import { LogInIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Branches", to: "/branches" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

function DesktopNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn("hidden items-center gap-0.5 lg:flex", className)}
    >
      {navItems.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
              "hover:text-foreground hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive ? "text-foreground" : "text-muted-foreground"
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

      <div className="ml-3 flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-4 text-sm font-medium"
          render={<Link to="/login" />}
        >
          <LogInIcon className="size-4" />
          Login
        </Button>

        <Button
          variant="default"
          size="sm"
          className="ml-1 h-9 px-4 text-sm font-semibold"
          render={<Link to="/enquire" />}
        >
          Enquire Now
        </Button>
      </div>
    </nav>
  );
}

export { DesktopNav, navItems };
