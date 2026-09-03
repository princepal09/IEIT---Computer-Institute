import {
  ArrowUpRightIcon,
  MailIcon,
  MapIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";

import type { Branch } from "@/types/branch";

interface BranchContactProps {
  branch: Branch;
}

const BranchContact = ({ branch }: BranchContactProps) => {
  const whatsappNumber = branch.whatsapp?.replace(/\D/g, "");

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/91${whatsappNumber}`
    : null;

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-16">
          {/* =========================================================
              LEFT — CTA CONTENT
          ========================================================= */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-ieit-blue" />

              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ieit-blue">
                Get In Touch
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
              Ready to take
              <br />
              <span className="text-ieit-blue">the next step?</span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Have questions about admissions, courses, fees, or career
              opportunities? Our team at{" "}
              <span className="font-semibold text-slate-700">
                {branch.name}
              </span>{" "}
              is ready to help you.
            </p>

            {/* Enquiry topics */}
            <div className="mt-8 grid max-w-xl gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                "Course information",
                "Admission guidance",
                "Fee & eligibility",
                "Career guidance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-blue-50">
                    <span className="size-1.5 rounded-full bg-ieit-blue" />
                  </span>

                  {item}
                </div>
              ))}
            </div>

            {/* Main actions */}
            <div className="mt-9 flex flex-wrap gap-3">
              {/* Enquire Now */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-lg bg-ieit-blue px-5 text-xs font-semibold text-white transition-all duration-300 hover:bg-ieit-blue/90 hover:shadow-lg hover:shadow-blue-900/10"
                >
                  <MessageCircleIcon className="size-4" />
                  Enquire Now
                  <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              {/* Call */}
              <a
                href={`tel:${branch.phone}`}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <PhoneIcon className="size-3.5" />
                Call Branch
              </a>
            </div>
          </div>

          {/* =========================================================
              RIGHT — CONTACT + MAP
          ========================================================= */}
          <div className="w-full">
            {/* Contact Card */}
            <div className="overflow-hidden rounded-2xl bg-[#20282a] shadow-[0_20px_50px_rgba(15,23,42,0.16)]">
              <div className="p-6 sm:p-7">
                {/* Card heading */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-blue-300">
                      Contact Branch
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">
                      {branch.name}
                    </h3>
                  </div>

                  <div className="flex size-9 items-center justify-center rounded-full bg-white/10">
                    <MessageCircleIcon className="size-4 text-blue-300" />
                  </div>
                </div>

                {/* Contact details */}
                <div className="mt-7 space-y-5">
                  {/* Phone */}
                  <a
                    href={`tel:${branch.phone}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/15">
                      <PhoneIcon className="size-4 text-white" />
                    </div>

                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/40">
                        Phone
                      </p>

                      <p className="mt-1 text-xs text-white/85 transition-colors group-hover:text-white">
                        {branch.phone}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${branch.email}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/15">
                      <MailIcon className="size-4 text-white" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/40">
                        Email
                      </p>

                      <p className="mt-1 break-all text-xs text-white/85 transition-colors group-hover:text-white">
                        {branch.email}
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/15">
                        <MessageCircleIcon className="size-4 text-white" />
                      </div>

                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/40">
                          WhatsApp
                        </p>

                        <p className="mt-1 text-xs text-white/85 transition-colors group-hover:text-white">
                          {branch.whatsapp}
                        </p>
                      </div>
                    </a>
                  )}
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-white/10" />

                {/* Enquire button */}
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-11 w-full items-center justify-between rounded-lg bg-ieit-blue px-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-ieit-blue/90"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircleIcon className="size-4" />
                      Contact Branch
                    </span>

                    <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
                      <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Google Maps */}
            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-4 block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-[220px] overflow-hidden">
                <iframe
                  title={`${branch.name} location`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    branch.address
                  )}&output=embed`}
                  className="pointer-events-none absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-black/5" />

                {/* Map label */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[9px] font-semibold text-slate-700 shadow-md">
                  <MapIcon className="size-3.5 text-ieit-blue" />
                  Open in Google Maps
                  <ArrowUpRightIcon className="size-3" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchContact;
