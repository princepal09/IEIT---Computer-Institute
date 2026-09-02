import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/shared/PageContainer";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
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
] as const;

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
] as const;

const contactInfo = [
  { icon: MapPinIcon, text: "123 ICT Tower, Gulshan-1, Dhaka 1212" },
  { icon: PhoneIcon, text: "+880 1XXX-XXXXXX" },
  { icon: MailIcon, text: "info@ieit.edu.bd" },
] as const;

const Footer = ({ className }: { className?: string }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn("bg-ieit-navy text-white", className)}
      role="contentinfo"
    >
      {/* Main footer content */}
      <PageContainer size="wide" padding="none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 pt-12 pb-10 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ieit-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy"
              aria-label="IEIT — Home"
            >
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-[0.08em] text-white">
                  IEIT
                </span>

                <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                  Computer Institute
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-[0.8125rem] leading-relaxed text-white/55">
              Empowering students with quality education and industry-ready
              skills across information technology and professional development.
            </p>

            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg text-white/45 transition-all duration-200",
                    "hover:bg-white/8 hover:text-white hover:scale-105",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy",
                  )}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links column */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-widest text-white/35 uppercase">
              Quick Links
            </h3>

            <ul className="flex flex-col gap-2.5" role="list">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      "text-[0.8125rem] text-white/60 transition-colors duration-150",
                      "hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy rounded-sm",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-widest text-white/35 uppercase">
              Contact
            </h3>

            <div className="flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-2.5 text-[0.8125rem] text-white/55"
                >
                  <Icon className="mt-0.5 size-3.5 shrink-0 text-white/35" />
                  <span className="leading-relaxed">{text}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-lg border border-white/12 px-4 text-[0.8125rem] font-medium text-white/65 transition-all duration-200",
                "hover:bg-white/5 hover:text-white hover:border-white/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy",
                "self-start mt-1",
              )}
            >
              Contact Us
            </Link>
          </div>

          {/* Get Started column */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-widest text-white/35 uppercase">
              Get Started
            </h3>

            <p className="text-[0.8125rem] leading-relaxed text-white/55">
              Ready to begin your learning journey? Get in touch for course
              details and admission guidance.
            </p>

            <Link
              to="/enquire"
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-lg bg-ieit-blue px-5 text-[0.8125rem] font-semibold text-white transition-all duration-200",
                "hover:bg-ieit-blue/90 hover:shadow-lg hover:shadow-ieit-blue/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy",
                "self-start mt-1",
              )}
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </PageContainer>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <PageContainer size="wide" padding="none">
          <div className="flex flex-col items-center gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 lg:px-8">
            <p className="text-[0.6875rem] text-white/30">
              &copy; {year} IEIT. All rights reserved.
            </p>

            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 sm:justify-end"
            >
              <Link
                to="/privacy"
                className={cn(
                  "rounded-sm text-[0.6875rem] text-white/30 transition-colors duration-150",
                  "hover:text-white/60",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy",
                )}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className={cn(
                  "rounded-sm text-[0.6875rem] text-white/30 transition-colors duration-150",
                  "hover:text-white/60",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ieit-navy",
                )}
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </PageContainer>
      </div>
    </footer>
  );
};

export default Footer;
