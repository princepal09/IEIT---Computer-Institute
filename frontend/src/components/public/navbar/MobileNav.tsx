import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDownIcon,
  LogInIcon,
  MapPinIcon,
  MenuIcon,
} from "lucide-react";
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
import { branches } from "@/data/branches";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [branchesExpanded, setBranchesExpanded] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="lg:hidden"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-72 p-0 sm:max-w-72">
        <SheetHeader className="border-b border-border/60 px-5 py-4">
          <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="flex flex-col gap-0.5 px-3 py-4">
          <AnimatePresence initial={false}>
            {open &&
              navItems.map(({ label, to }, index) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
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
                        "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        "hover:bg-muted hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground",
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Branches accordion */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18, delay: navItems.length * 0.03, ease: "easeOut" }}
              >
                <button
                  type="button"
                  onClick={() => setBranchesExpanded((prev) => !prev)}
                  aria-expanded={branchesExpanded}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    branchesExpanded
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  Branches
                  <ChevronDownIcon
                    className={cn(
                      "size-4 transition-transform duration-200",
                      branchesExpanded && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {branchesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 pl-3 pt-1">
                        {branches.map((branch) => (
                          <NavLink
                            key={branch.id}
                            to={`/branches/${branch.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-start gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-muted-foreground"
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
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <div className="flex flex-col gap-2 border-t border-border/60 px-5 py-4">
          <Button
            variant="ghost"
            size="default"
            className="w-full font-medium"
            render={<Link to="/login" />}
          >
            <LogInIcon className="size-4" />
            Login
          </Button>

          <Button
            variant="default"
            size="default"
            className="w-full font-semibold"
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
