import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon, MapPinIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useBranches } from "@/hooks/use-branch";

const BranchesSkeleton = () => {
  return (
    <div className="space-y-1 px-1.5 py-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-lg px-2.5 py-2.5"
        >
          <Skeleton className="size-8 shrink-0 rounded-lg" />

          <div className="flex flex-1 flex-col gap-2 pt-0.5">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2.5 w-20" />
          </div>

          <Skeleton className="mt-1 size-3 rounded" />
        </div>
      ))}
    </div>
  );
};

const BranchesDropdown = () => {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: branches = [], isLoading, isError } = useBranches();

  const clearTimers = useCallback(() => {
    if (hoverTimeout.current !== null) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    if (leaveTimeout.current !== null) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  }, []);

  const openDropdown = useCallback(() => {
    clearTimers();

    hoverTimeout.current = setTimeout(() => {
      setOpen(true);
    }, 80);
  }, [clearTimers]);

  const closeDropdown = useCallback(() => {
    clearTimers();

    leaveTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 120);
  }, [clearTimers]);

  const toggleDropdown = useCallback(() => {
    clearTimers();
    setOpen((prev) => !prev);
  }, [clearTimers]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();

        clearTimers();
        setOpen(false);

        triggerRef.current?.focus();
      }
    },
    [clearTimers],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        clearTimers();
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimers();
    };
  }, [clearTimers]);

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
      >
        {/* Trigger */}

        <button
          ref={triggerRef}
          type="button"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          aria-expanded={open}
          aria-haspopup="menu"
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-2",
            "text-[0.8125rem] font-medium",
            "transition-all duration-200",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-ieit-blue/40",
            "focus-visible:ring-offset-2",
            open
              ? "bg-slate-100 text-slate-900"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          )}
        >
          <span>Branches</span>

          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "size-3.5 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        {/* Dropdown */}

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              aria-label="IEIT branches"
              initial={{
                opacity: 0,
                y: -6,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -6,
                scale: 0.98,
              }}
              transition={{
                duration: 0.16,
                ease: "easeOut",
              }}
              className={cn(
                "absolute left-0 top-full z-50 mt-2",
                "w-80 origin-top-left",
                "overflow-hidden rounded-xl",
                "border border-slate-200/80",
                "bg-white/95",
                "p-1.5",
                "shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]",
                "backdrop-blur-xl",
              )}
            >
              {/* Header */}

              <div className="border-b border-slate-100 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ieit-blue">
                      IEIT
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-slate-800">
                      Our Branches
                    </p>
                  </div>

                  {!isLoading && !isError && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-[9px] font-medium text-slate-500">
                      {branches.length}{" "}
                      {branches.length === 1 ? "Branch" : "Branches"}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}

              <div className="py-1">
                {/* Skeleton */}

                {isLoading && <BranchesSkeleton />}

                {/* Error */}

                {isError && (
                  <div className="px-3 py-5 text-center">
                    <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-full bg-red-50">
                      <MapPinIcon className="size-3.5 text-red-400" />
                    </div>

                    <p className="text-xs font-medium text-red-500">
                      Unable to load branches.
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Please try again later.
                    </p>
                  </div>
                )}

                {/* Empty */}

                {!isLoading && !isError && branches.length === 0 && (
                  <div className="px-3 py-5 text-center">
                    <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-full bg-slate-100">
                      <MapPinIcon className="size-3.5 text-slate-400" />
                    </div>

                    <p className="text-xs font-medium text-slate-600">
                      No branches available.
                    </p>
                  </div>
                )}

                {/* Branches */}

                {!isLoading &&
                  !isError &&
                  branches.map((branch) => (
                    <Tooltip key={branch.id}>
                      <TooltipTrigger
                        render={
                          <Link
                            to={`/branches/${branch.slug}`}
                            role="menuitem"
                            onClick={() => {
                              clearTimers();
                              setOpen(false);
                            }}
                            className={cn(
                              "group flex w-full items-start gap-3",
                              "rounded-lg px-2.5 py-2.5",
                              "transition-all duration-150",
                              "hover:bg-slate-50",
                              "focus-visible:outline-none",
                              "focus-visible:ring-2",
                              "focus-visible:ring-ieit-blue/30",
                            )}
                          >
                            {/* Location icon */}

                            <span
                              className={cn(
                                "mt-0.5 flex size-8 shrink-0 items-center justify-center",
                                "rounded-lg",
                                "bg-blue-50",
                                "text-ieit-blue",
                                "transition-colors duration-150",
                                "group-hover:bg-blue-100",
                              )}
                            >
                              <MapPinIcon
                                aria-hidden="true"
                                className="size-3.5"
                              />
                            </span>

                            {/* Branch information */}

                            <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
                              <span className="text-[0.8125rem] font-semibold leading-tight text-slate-800 transition-colors group-hover:text-ieit-blue">
                                {branch.name}
                              </span>

                              <span className="truncate text-[11px] leading-tight text-slate-500">
                                {branch.location}
                              </span>
                            </span>

                            {/* Arrow */}

                            <span className="mt-1 text-slate-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-ieit-blue">
                              →
                            </span>
                          </Link>
                        }
                      />

                      {branch.address && (
                        <TooltipContent
                          side="left"
                          sideOffset={10}
                          className="max-w-xs"
                        >
                          <p className="text-xs leading-5">{branch.address}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
              </div>

              {/* Footer */}

              {!isLoading && !isError && branches.length > 0 && (
                <div className="border-t border-slate-100 px-3 py-2">
                  <Link
                    to="/branches"
                    onClick={() => {
                      clearTimers();
                      setOpen(false);
                    }}
                    className={cn(
                      "group flex items-center justify-between",
                      "rounded-md px-2 py-1.5",
                      "font-mono text-[9px] font-semibold uppercase",
                      "tracking-[0.1em]",
                      "text-slate-500",
                      "transition-colors",
                      "hover:bg-slate-50 hover:text-ieit-blue",
                    )}
                  >
                    <span>View all branches</span>

                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
};

export { BranchesDropdown };
