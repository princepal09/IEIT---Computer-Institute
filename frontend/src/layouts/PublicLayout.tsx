import { type ComponentPropsWithRef, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import Navbar from "@/components/public/navbar/Navbar";
import Footer from "@/components/public/footer/Footer";

interface PublicLayoutProps extends ComponentPropsWithRef<"div"> {
  /** Renders children instead of the routed <Outlet />. */
  children?: ReactNode;
}

const PublicLayout = ({ children, className, ...props }: PublicLayoutProps) => {
  return (
    <div
      className={cn("flex min-h-screen flex-col bg-background", className)}
      {...props}
    >
      <Navbar />

      <main className="flex-1" id="main-content">
        {children ?? <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
