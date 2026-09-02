import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

import { PageContainer } from "@/components/shared/PageContainer";

import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ArrowUpRightIcon,
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
  {
    icon: MapPinIcon,
    text: "123 ICT Tower, Gulshan-1, Dhaka 1212",
  },
  {
    icon: PhoneIcon,
    text: "+880 1XXX-XXXXXX",
  },
  {
    icon: MailIcon,
    text: "info@ieit.edu.bd",
  },
] as const;

const Footer = ({ className }: { className?: string }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-ieit-navy text-white",
        className
      )}
      role="contentinfo"
    >
      {/* =========================================================
          BACKGROUND ACCENTS
          ========================================================= */}

      {/* Blue glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-10
          h-80
          w-80
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      {/* Red glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          -right-40
          top-0
          h-3
          w-96
          rounded-full
          bg-red-500/10
          blur-3xl
        "
      />

      {/* Small red accent line */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-32
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-red-500
          to-transparent
        "
      />

      {/* =========================================================
          MAIN FOOTER CONTENT
          ========================================================= */}

      <PageContainer size="default" padding="none">
        <div
          className="
            relative
            grid
            grid-cols-1
            gap-x-8
            gap-y-10
            px-4
            pt-12
            pb-10
            sm:px-6
            md:grid-cols-2
            lg:grid-cols-12
            lg:gap-x-8
            lg:px-8
          "
        >
          {/* =====================================================
              BRAND COLUMN
              ===================================================== */}

          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link
              to="/"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-lg
                outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
                focus-visible:ring-offset-2
                focus-visible:ring-offset-ieit-navy
              "
              aria-label="IEIT — Home"
            >
              <div className="flex flex-col leading-none">
                <span
                  className="
                    text-xl
                    font-extrabold
                    tracking-[0.08em]
                    text-white
                    transition-colors
                    duration-200
                    group-hover:text-red-400
                  "
                >
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

            {/* Social icons */}

            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg text-white/45",
                    "transition-all duration-200",
                    "hover:scale-105",
                    "hover:bg-red-500/15",
                    "hover:text-red-400",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-red-500/40",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-ieit-navy"
                  )}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* =====================================================
              QUICK LINKS
              ===================================================== */}

          <div className="flex flex-col gap-4 lg:col-span-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Quick Links
              </h3>

              <div className="mt-2 h-0.5 w-6 rounded-full bg-red-500" />
            </div>

            <ul className="flex flex-col gap-2.5" role="list">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      "group inline-flex items-center gap-1",
                      "text-[0.8125rem] text-white/60",
                      "transition-colors duration-150",
                      "hover:text-red-400",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-red-500/40",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-ieit-navy"
                    )}
                  >
                    {label}

                    <ArrowUpRightIcon
                      className="
                        size-3
                        opacity-0
                        -translate-x-1
                        transition-all
                        duration-200
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              CONTACT
              ===================================================== */}

          <div className="flex flex-col gap-4 lg:col-span-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Contact
              </h3>

              <div className="mt-2 h-0.5 w-6 rounded-full bg-red-500" />
            </div>

            <div className="flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="
                    flex
                    items-start
                    gap-2.5
                    text-[0.8125rem]
                    text-white/55
                  "
                >
                  <Icon className="mt-0.5 size-3.5 shrink-0 text-red-400/80" />

                  <span className="leading-relaxed">{text}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className={cn(
                "inline-flex h-9 items-center justify-center gap-1.5",
                "self-start rounded-lg",
                "border border-white/12",
                "px-4",
                "text-[0.8125rem] font-medium text-white/65",
                "transition-all duration-200",
                "hover:border-red-500/40",
                "hover:bg-red-500/10",
                "hover:text-red-400",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-red-500/40",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-ieit-navy"
              )}
            >
              Contact Us
              <ArrowUpRightIcon className="size-3.5" />
            </Link>
          </div>

          {/* =====================================================
              GET STARTED
              ===================================================== */}

          <div className="flex flex-col gap-4 lg:col-span-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Get Started
              </h3>

              <div className="mt-2 h-0.5 w-6 rounded-full bg-red-500" />
            </div>

            <p className="text-[0.8125rem] leading-relaxed text-white/55">
              Ready to begin your learning journey? Get in touch for course
              details and admission guidance.
            </p>

            {/* Enroll CTA */}

            <Link
              to="/enquire"
              className="
                group
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                self-start
                rounded-lg
                bg-red-600
                px-5
                text-[0.8125rem]
                font-semibold
                text-white
                shadow-lg
                shadow-red-950/20
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-red-500
                hover:shadow-xl
                hover:shadow-red-500/20
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-ieit-navy
              "
            >
              Enroll Now
              <ArrowUpRightIcon
                className="
                  size-3.5
                  transition-transform
                  duration-200
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </PageContainer>

      {/* =========================================================
          BOTTOM BAR
          ========================================================= */}

      <div className="relative border-t border-white/8">
        <PageContainer size="default" padding="none">
          <div
            className="
              flex
              flex-col
              items-center
              gap-3
              px-4
              py-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-6
              sm:py-4
              lg:px-8
            "
          >
            <p className="text-[0.6875rem] text-white/30">
              &copy; {year} IEIT. All rights reserved.
            </p>

            <nav
              aria-label="Legal"
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-1.5
                sm:justify-end
              "
            >
              <Link
                to="/privacy"
                className="
                  rounded-sm
                  text-[0.6875rem]
                  text-white/30
                  transition-colors
                  duration-150
                  hover:text-red-400
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-red-500/40
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-ieit-navy
                "
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="
                  rounded-sm
                  text-[0.6875rem]
                  text-white/30
                  transition-colors
                  duration-150
                  hover:text-red-400
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-red-500/40
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-ieit-navy
                "
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
