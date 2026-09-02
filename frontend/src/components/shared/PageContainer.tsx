import { type ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends ComponentPropsWithRef<"div"> {
  /** Restrict max width. Defaults to "default" (max-w-7xl). */
  size?: "narrow" | "default" | "wide" | "full";
  /** Vertical padding scale. Defaults to "md". */
  padding?: "none" | "sm" | "md" | "lg";
}

const sizeClasses = {
  narrow: "max-w-5xl",
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
  full: "max-w-full",
} as const;

const paddingClasses = {
  none: "",
  sm: "px-4 sm:px-6",
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-6 sm:px-8 lg:px-12",
} as const;

function PageContainer({
  className,
  size = "default",
  padding = "md",
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { PageContainer, type PageContainerProps };
