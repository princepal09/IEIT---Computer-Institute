import {
  AlertCircleIcon,
  HomeIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showHome?: boolean;
  className?: string;
};

const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load this content right now. Please try again.",
  onRetry,
  showHome = false,
  className,
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        "flex min-h-[280px] w-full flex-col items-center justify-center px-5 py-12 text-center",
        className,
      )}
    >
      {/* Icon */}
      <div className="flex size-12 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-100">
        <AlertCircleIcon className="size-5 text-red-500" />
      </div>

      {/* Content */}
      <div className="mt-4 max-w-md">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          {title}
        </h2>

        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      {/* Actions */}
      {(onRetry || showHome) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={cn(
                "inline-flex h-9 items-center justify-center gap-2",
                "rounded-md bg-ieit-blue px-4",
                "text-xs font-medium text-white",
                "transition-all duration-200",
                "hover:bg-ieit-blue-dark",
                "hover:-translate-y-0.5",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ieit-blue",
                "focus-visible:ring-offset-2",
              )}
            >
              <RefreshCwIcon className="size-3.5" />
              Try again
            </button>
          )}

          {showHome && (
            <Link
              to="/"
              className={cn(
                "inline-flex h-9 items-center justify-center gap-2",
                "rounded-md border border-slate-200 bg-white px-4",
                "text-xs font-medium text-slate-700",
                "transition-all duration-200",
                "hover:border-slate-300 hover:bg-slate-50",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ieit-blue",
                "focus-visible:ring-offset-2",
              )}
            >
              <HomeIcon className="size-3.5" />
              Go home
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorState;