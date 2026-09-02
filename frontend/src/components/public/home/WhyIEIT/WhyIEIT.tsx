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
    <section className="relative overflow-hidden bg-[#f7f9fc] py-20 sm:py-4 lg:py-4">
      {/* =========================================================
          BACKGROUND GRADIENTS
         ========================================================= */}

      {/* Blue glow — left */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-48 top-10
          h-[28rem] w-[28rem]
          rounded-full
          bg-blue-200/30
          blur-3xl
        "
      />

      {/* Red glow — right */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-48 bottom-0
          h-[26rem] w-[26rem]
          rounded-full
          bg-red-200/25
          blur-3xl
        "
      />

      {/* Small center accent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-40 w-40
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-blue-100/20
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =========================================================
            HEADER
           ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow */}

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-blue-300" />

            <span
              className="
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-blue-600
              "
            >
              Why IEIT
            </span>

            <span className="h-px w-8 bg-red-300" />
          </div>

          {/* Heading */}

          <h2
            className="
              text-3xl
              font-extrabold
              tracking-[-0.04em]
              text-slate-900
              sm:text-4xl
              lg:text-5xl
            "
          >
            More Than Just
            <span className="mt-1 block">
              <span className="text-blue-600">Computer </span>
              <span className="text-red-500">Education.</span>
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-6
              text-slate-600
              sm:text-[15px]
            "
          >
            At IEIT, we combine practical learning, expert guidance, and
            career-focused education to help students build skills that matter.
          </p>
        </motion.div>

        {/* =========================================================
            CARDS
           ========================================================= */}

        <div
          className="
            mt-12
            grid
            gap-4
            sm:grid-cols-2
            lg:mt-16
            lg:grid-cols-4
          "
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.number}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200/80
                  bg-white
                  p-6
                  shadow-[0_10px_35px_-25px_rgba(15,23,42,0.25)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-[0_20px_45px_-25px_rgba(37,99,235,0.25)]
                "
              >
                {/* =================================================
                    TOP
                   ================================================= */}

                <div className="flex items-start justify-between">
                  {/* Number */}

                  <span
                    className="
                      font-mono
                      text-[10px]
                      font-bold
                      tracking-[0.15em]
                      text-red-500
                      transition-colors
                      duration-300
                      group-hover:text-red-600
                    "
                  >
                    {reason.number}
                  </span>

                  {/* Icon */}

                  <div
                    className="
                      flex
                      size-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600

                      transition-all
                      duration-300

                      group-hover:bg-blue-600
                      group-hover:text-white
                      group-hover:shadow-[0_8px_20px_-8px_rgba(37,99,235,0.7)]
                    "
                  >
                    <Icon className="size-4" />
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                   ================================================= */}

                <div className="mt-10">
                  <h3
                    className="
                      text-base
                      font-bold
                      tracking-[-0.02em]
                      text-slate-900
                    "
                  >
                    {reason.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {reason.description}
                  </p>
                </div>

                {/* =================================================
                    BOTTOM
                   ================================================= */}

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-4
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    IEIT Advantage
                  </span>

                  <ArrowUpRightIcon
                    className="
                      size-3.5
                      text-slate-300

                      transition-all
                      duration-300

                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-red-500
                    "
                  />
                </div>

                {/* =================================================
                    CARD RED ACCENT
                   ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-gradient-to-r
                    from-blue-600
                    to-red-500
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

                {/* =================================================
                    SUBTLE CARD GLOW
                   ================================================= */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-16
                    -right-16
                    size-32
                    rounded-full
                    bg-red-100/40
                    blur-2xl
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
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
