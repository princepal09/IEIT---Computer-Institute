import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/PageContainer";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const quickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Branches", to: "/branches" },
  { label: "Gallery", to: "/gallery" },
  // { label: "Notices", to: "/notices" },
] as const;

// Social icons are placeholders — official IEIT profile URLs are not yet
// available in the project, so they render as non-navigating brand marks
// to be wired to the real destinations later.
const socialLinks = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "Instagram", icon: FaInstagram },
  { label: "YouTube", icon: FaYoutube },
  { label: "LinkedIn", icon: FaLinkedinIn },
] as const;

function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn("bg-ieit-navy text-white", className)}
      role="contentinfo"
    >
      {/* Main footer content */}
      <PageContainer size="wide" padding="none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 px-4 pt-14 pb-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:px-8">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ieit-blue focus-visible:ring-offset-2"
              aria-label="IEIT — Home"
            >
              <div className="flex flex-col leading-none">
                <span className="text-[1.65rem] font-extrabold tracking-[-0.06em] text-white">
                  IEIT
                </span>

                <span className="mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Computer Institute
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Empowering students with quality education and industry-ready
              skills across information technology and professional development.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  role="img"
                  aria-label={label}
                  className="flex cursor-pointer size-9 items-center justify-center rounded-lg bg-white/5 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>
          </div>

          {/* Quick links column */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
              Quick Links
            </h3>

            <ul className="flex flex-col gap-3" role="list">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      "text-sm text-white/70 transition-colors",
                      "hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy rounded-sm",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
              Contact
            </h3>

            <p className="text-sm leading-relaxed text-white/70">
              Have a question about our courses, branches, or admissions? Our
              team is happy to help.
            </p>

            <Link
              to="/contact"
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-lg border border-white/15 px-5 text-sm font-medium text-white/80 transition-colors",
                "hover:bg-white/5 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy",
                "self-start",
              )}
            >
              Contact Us
            </Link>
          </div>

          {/* Enquire column */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
              Get Started
            </h3>

            <p className="text-sm leading-relaxed text-white/70">
              Ready to begin your learning journey? Get in touch for course
              details and admission guidance.
            </p>

            <Link
              to="/enquire"
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-lg bg-ieit-blue px-5 text-sm font-semibold text-white transition-colors",
                "hover:bg-ieit-blue/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy",
                "self-start",
              )}
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </PageContainer>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <PageContainer size="wide" padding="none">
          <div className="flex flex-col items-center gap-4 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
            <p className="text-xs text-white/40">
              &copy; {year} IEIT. All rights reserved.
            </p>

            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end"
            >
              <Link
                to="/privacy"
                className="rounded-sm text-xs text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="rounded-sm text-xs text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </PageContainer>
      </div>
    </footer>
  );
}

export default Footer;
