import { useCallback, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "motion/react";

import { ChevronDownIcon, MapPinIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { branches } from "@/data/branches";

const BranchesDropdown = () => {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback(() => {
    if (hoverTimeout.current !== null) {
      clearTimeout(hoverTimeout.current);
    }

    hoverTimeout.current = setTimeout(() => setOpen(true), 80);
  }, []);

  const closeDropdown = useCallback(() => {
    if (hoverTimeout.current !== null) {
      clearTimeout(hoverTimeout.current);
    }

    leaveTimeout.current = setTimeout(() => setOpen(false), 100);
  }, []);

  const toggleDropdown = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      if (hoverTimeout.current !== null) {
        clearTimeout(hoverTimeout.current);
      }

      if (leaveTimeout.current !== null) {
        clearTimeout(leaveTimeout.current);
      }
    };
  }, []);

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
        onKeyDown={handleKeyDown}
      >
        <button
          ref={triggerRef}
          type="button"
          onClick={toggleDropdown}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleDropdown();
            }
          }}
          aria-expanded={open}
          aria-haspopup="true"
          className={cn(
            "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md",
            "hover:text-foreground hover:bg-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            open ? "text-foreground bg-muted" : "text-muted-foreground",
          )}
        >
          Branches

          <ChevronDownIcon
            className={cn(
              "size-3.5 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 top-full z-50 mt-1.5 w-72 origin-top-left rounded-lg border border-border/80 bg-popover p-1.5 shadow-elevated"
            >
              <div className="px-2.5 py-2">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  Our Branches
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                {branches.map((branch) => (
                  <Tooltip key={branch.id}>
                    <TooltipTrigger
                      render={
                        <Link
                          to={`/branches/${branch.slug}`}
                          role="menuitem"
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-start gap-2.5 rounded-md px-2.5 py-2 transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            "text-foreground",
                          )}
                        />
                      }
                    >
                      <MapPinIcon className="mt-0.5 size-3.5 shrink-0 text-ieit-blue" />

                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium leading-tight">
                          {branch.name}
                        </span>

                        <span className="text-xs leading-tight text-muted-foreground">
                          {branch.location}
                        </span>
                      </div>
                    </TooltipTrigger>

                    <TooltipContent side="left" sideOffset={8}>
                      <p>{branch.address}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
};

export { BranchesDropdown };