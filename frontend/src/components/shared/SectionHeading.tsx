import { type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4";

interface SectionHeadingProps extends ComponentPropsWithRef<"div"> {
  /** The text content of the heading. */
  heading: ReactNode;
  /** HTML heading element. Defaults to "h2". */
  as?: HeadingTag;
  /** Optional subtitle displayed below the heading. */
  subtitle?: ReactNode;
  /** Horizontal alignment. Defaults to "left". */
  align?: "left" | "center";
  /** Show a short accent line beneath the heading. Defaults to true. */
  accent?: boolean;
}

const headingClasses: Record<HeadingTag, string> = {
  h1: "text-3xl sm:text-4xl lg:text-5xl",
  h2: "text-2xl sm:text-3xl lg:text-4xl",
  h3: "text-xl sm:text-2xl lg:text-3xl",
  h4: "text-lg sm:text-xl lg:text-2xl",
};

const SectionHeading = ({
  heading,
  as: Tag = "h2",
  subtitle,
  align = "left",
  accent = true,
  className,
  ...props
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      <Tag
        className={cn(
          "font-semibold tracking-tight text-foreground",
          headingClasses[Tag]
        )}
      >
        {heading}
      </Tag>

      {accent && (
        <span
          aria-hidden="true"
          className="h-1 w-12 rounded-full bg-(--ieit-blue)"
        />
      )}

      {subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export { SectionHeading, type SectionHeadingProps };
