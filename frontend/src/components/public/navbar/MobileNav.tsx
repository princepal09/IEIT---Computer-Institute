import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { ChevronDownIcon, LogInIcon, MapPinIcon, MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { navItems } from "./DesktopNav";
import { Skeleton } from "@/components/ui/skeleton";
import { useBranches } from "@/hooks/useBranches";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [branchesExpanded, setBranchesExpanded] = useState(false);

  const { data: branches = [], isLoading, isError } = useBranches();

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          setBranchesExpanded(false);
        }
      }}
    >
      {/* =========================================================
          MENU TRIGGER
      ========================================================= */}

      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className={cn(
              "lg:hidden",
              "rounded-lg",
              "text-slate-700",
              "hover:bg-slate-100 hover:text-slate-950"
            )}
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>

      {/* =========================================================
          MOBILE SHEET
      ========================================================= */}

      <SheetContent side="right" className="w-80 max-w-[85vw] p-0 sm:max-w-80">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <SheetHeader className="border-b border-slate-200/70 px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-left">
            <span className="text-base font-extrabold tracking-[0.08em] text-ieit-navy">
              IEIT
            </span>

            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Computer Institute
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* =======================================================
            NAVIGATION
        ======================================================= */}

        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-1 px-3 py-4"
        >
          {/* =====================================================
              NORMAL NAV ITEMS
          ===================================================== */}

          <AnimatePresence initial={false}>
            {open &&
              navItems.map(({ label, to }, index) => (
                <motion.div
                  key={to}
                  initial={{
                    opacity: 0,
                    x: 12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 12,
                  }}
                  transition={{
                    duration: 0.18,
                    delay: index * 0.03,
                    ease: "easeOut",
                  }}
                >
                  <NavLink
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center rounded-lg px-3 py-2.5",
                        "text-sm font-medium",
                        "transition-colors duration-200",

                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-ieit-blue/30",
                        "focus-visible:ring-offset-2",

                        isActive
                          ? "bg-ieit-blue/8 text-ieit-blue"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* =====================================================
              BRANCHES
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.18,
              delay: navItems.length * 0.03,
              ease: "easeOut",
            }}
          >
            <button
              type="button"
              onClick={() => setBranchesExpanded((previous) => !previous)}
              aria-expanded={branchesExpanded}
              className={cn(
                "flex w-full items-center justify-between",
                "rounded-lg px-3 py-2.5",
                "text-sm font-medium",
                "transition-colors duration-200",

                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ieit-blue/30",
                "focus-visible:ring-offset-2",

                branchesExpanded
                  ? "bg-ieit-blue/8 text-ieit-blue"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              )}
            >
              <span>Branches</span>

              <ChevronDownIcon
                className={cn(
                  "size-4 transition-transform duration-200",
                  branchesExpanded && "rotate-180"
                )}
              />
            </button>

            {/* =================================================
                BRANCH LIST
            ================================================= */}

            <AnimatePresence initial={false}>
              {branchesExpanded && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pl-3 pt-1">
                    {/* =================================================
                        LOADING SKELETON
                    ================================================= */}

                    {isLoading && (
                      <>
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-lg px-3 py-2"
                          >
                            <Skeleton className="size-4 rounded-full" />

                            <div className="flex flex-1 flex-col gap-1.5">
                              <Skeleton className="h-3.5 w-28" />
                              <Skeleton className="h-3 w-20" />
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {isError && (
                      <div className="rounded-lg bg-red-50 px-3 py-3 text-xs text-red-600">
                        Unable to load branches.
                      </div>
                    )}

                    {/* =================================================
                        EMPTY
                    ================================================= */}

                    {!isLoading && !isError && branches.length === 0 && (
                      <div className="rounded-lg px-3 py-3 text-xs text-slate-500">
                        No branches available.
                      </div>
                    )}

                    {/* =================================================
                        BRANCHES
                    ================================================= */}

                    {!isLoading &&
                      !isError &&
                      branches.map((branch) => (
                        <NavLink
                          key={branch.id}
                          to={`/branches/${branch.slug}`}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              "flex items-start gap-2.5",
                              "rounded-lg px-3 py-2.5",
                              "transition-colors duration-200",

                              "focus-visible:outline-none",
                              "focus-visible:ring-2",
                              "focus-visible:ring-ieit-blue/30",
                              "focus-visible:ring-offset-2",

                              isActive
                                ? "bg-ieit-blue/8 text-ieit-blue"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                            )
                          }
                        >
                          <MapPinIcon className="mt-0.5 size-4 shrink-0 text-ieit-blue" />

                          <div className="flex min-w-0 flex-col gap-0.5">
                            <span className="text-sm font-medium leading-tight">
                              {branch.name}
                            </span>

                            <span className="text-xs leading-tight text-slate-400">
                              {branch.location}
                            </span>
                          </div>
                        </NavLink>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* =========================================================
            ACTIONS
        ========================================================= */}

        <div className="mt-auto flex flex-col gap-2 border-t border-slate-200/70 px-5 py-4">
          <Button
            variant="ghost"
            size="default"
            className={cn(
              "w-full rounded-lg",
              "font-semibold",
              "text-slate-600",
              "hover:bg-slate-50 hover:text-slate-950"
            )}
            render={<Link to="/login" />}
          >
            <LogInIcon className="size-4" />
            Login
          </Button>

          <Button
            variant="default"
            size="default"
            className={cn(
              "w-full rounded-lg",
              "font-semibold",
              "shadow-sm shadow-ieit-blue/20",
              "transition-all duration-200",
              "hover:-translate-y-0.5",
              "hover:shadow-md hover:shadow-ieit-blue/25"
            )}
            render={<Link to="/enquire" />}
          >
            Enroll Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileNav };
