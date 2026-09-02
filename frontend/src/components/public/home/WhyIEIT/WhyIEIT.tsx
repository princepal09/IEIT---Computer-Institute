import { motion } from "motion/react";
import {
  AwardIcon,
  BriefcaseBusinessIcon,
  GraduationCapIcon,
  UsersIcon,
  ArrowUpRightIcon,
} from "lucide-react";

const reasons = [
  {
    icon: GraduationCapIcon,
    number: "01",
    title: "Industry-Aligned Learning",
    description:
      "Learn practical skills through curriculum designed around real-world technology and current industry needs.",
  },
  {
    icon: UsersIcon,
    number: "02",
    title: "Expert Mentorship",
    description:
      "Get guidance from experienced instructors who focus on helping you understand, build, and grow.",
  },
  {
    icon: BriefcaseBusinessIcon,
    number: "03",
    title: "Career Focused",
    description:
      "Build job-ready skills, projects, and confidence to take your next step into the technology industry.",
  },
  {
    icon: AwardIcon,
    number: "04",
    title: "Trusted Institution",
    description:
      "A learning environment focused on quality education, practical development, and long-term student success.",
  },
];

const WhyIEIT = () => {
  return (
    <section className="relative overflow-hidden bg-[#f4f8ff] py-20 sm:py-24 lg:py-28">
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-ieit-blue/40" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
              Why IEIT
            </span>

            <span className="h-px w-8 bg-ieit-blue/40" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl">
            More Than Just
            <span className="block text-ieit-blue">
              Computer Education.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
            At IEIT, we combine practical learning, expert guidance, and
            career-focused education to help students build skills that matter.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_10px_35px_-25px_rgba(0,80,180,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_45px_-25px_rgba(0,80,180,0.3)]"
              >
                {/* Number */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-blue-400">
                    {reason.number}
                  </span>

                  <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-ieit-blue transition-colors duration-300 group-hover:bg-ieit-blue group-hover:text-white">
                    <Icon className="size-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h3 className="text-base font-bold tracking-[-0.02em] text-slate-900">
                    {reason.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {reason.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">
                    IEIT Advantage
                  </span>

                  <ArrowUpRightIcon className="size-3.5 text-blue-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ieit-blue" />
                </div>

                {/* Subtle card glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -right-16 size-32 rounded-full bg-blue-100/50 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
              </motion.div>
            );
          })}
        </div>

      
      </div>
    </section>
  );
};

export default WhyIEIT;