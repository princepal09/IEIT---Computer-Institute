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
        "sticky top-0 z-40 border-b border-border/50 bg-white/85 backdrop-blur-md supports-backdrop-filter:bg-white/75",
        className,
      )}
    >
      <PageContainer size="wide" padding="none">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="IEIT — Home"
          >
            <img
              src={logo}
              alt="IEIT logo"
              className="h-8 w-auto object-contain"
              draggable={false}
            />
            <BrandLogo />
          </Link>

          {/* Desktop navigation */}
          <DesktopNav />

          {/* Mobile menu trigger */}
          <MobileNav />
        </div>
      </PageContainer>
    </header>
  );
};

export default Navbar;
