import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { LogInIcon, MenuIcon } from "lucide-react";
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

function MobileNav() {
  const [open, setOpen] = useState(false);

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
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-3 py-4">
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
                    delay: index * 0.04,
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
                          : "text-muted-foreground"
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
          </AnimatePresence>
        </nav>

        <div className="flex flex-col gap-2 border-t px-5 py-4">
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
            Enquire Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
