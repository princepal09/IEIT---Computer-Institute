import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/PageContainer";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import BrandLogo from "./BrandLogo";

import logo from "@/assets/logo/logo.png";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200/70",
        "bg-white/90 backdrop-blur-xl",
        "supports-backdrop-filter:bg-white/75",
        className
      )}
    >
      <PageContainer size="default" padding="none">
        <div className="flex h-[68px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            to="/"
            aria-label="IEIT — Home"
            className={cn(
              "group flex shrink-0 items-center gap-2.5",
              "rounded-lg px-1 py-1",
              "transition-opacity duration-200",
              "hover:opacity-90",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-ieit-blue/40",
              "focus-visible:ring-offset-2"
            )}
          >
            <img
              src={logo}
              alt="IEIT logo"
              className="h-9 w-auto object-contain"
              draggable={false}
            />

            <BrandLogo />
          </Link>

          {/* Desktop navigation */}
          <DesktopNav />

          {/* Mobile navigation */}
          <MobileNav />
        </div>
      </PageContainer>
    </header>
  );
};

export default Navbar;
